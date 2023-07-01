const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.post("/api/register", async (req, res) => {
  try {
    const {
      email,
      password,
      salt,
      name,
      dateOfBirth,
      copdSeverity,
      heightInCm,
      weightInKg,
    } = req.body;

    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM patient WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    const newUser = await pool.query(
      "INSERT INTO patient (email, password, salt, name, date_birth_mmddaaaa, copd_severity, heightincm, weightinkg) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        email,
        hashedPassword,
        salt,
        name,
        dateOfBirth,
        copdSeverity,
        heightInCm,
        weightInKg,
      ]
    );
    const token = jwt.sign(
      {
        userId: user.rows[0].id,
      },
      "secretkey",
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }

});



app.post("/api/cat", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const { cough, phlegm, activity, breathless, chest, energy, house, sleep } = req.body;
    const catScore = await pool.query(
      "INSERT INTO cat (cough, phlegm, activity, breathless, chest, energy, house, sleep, patientid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [cough, phlegm, activity, breathless, chest, energy, house, sleep,userId]
    );
    res.json(catScore);
  } catch (error) {
    console.error("Error: ", error);
    res.status(600).json({ message: "Server Error" });
  }
});

app.get("/api/getWV", authenticateUser, async (req, res) => {
  try{
    const userId = req.userId;

    const wellValue = await pool.query(
      `SELECT value, date FROM wellness WHERE patientId = $1`,
      [userId]
    );
    res.json(wellValue.rows[0]);
  }catch(error){
    console.error("Error fetching wellness value DB: " + error);
    res.status(600).json({message: "Error fetching wellnessvalue"});
  }
})

app.get("/api/getWvChart", authenticateUser, async(req, res)=>{
  try{
    const userId = req.userId;

    const wellData = await pool.query(
      `SELECT value, date FROM wellness WHERE patientId = $1`,
      [userId]
    );
    res.json(wellData.rows);
  }catch(error){
    console.error("Error fetching all Wellness Vaues Db" + error);
    res.status(600).json({message: "Error fetching wellness values"})
  }
})

app.post("/api/postWV", authenticateUser, async (req, res) => {
  try{
    const userId = req.userId;
    const {value} = req.body;

    const meter = await pool.query(
      `INSERT INTO wellness (value, patientid) VALUES ($1, $2) RETURNING * `,
      [value, userId]
    );
    res.json(meter);
  }catch(error){
    console.error("Error inserting wellness value: " + error);
    res.status(600).json({message: "Error inserting wellnessvalue"});
  }
});

app.post("/api/updateProfile", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId
    const {
      email,    
      name,
      dateOfBirth,
      heightInCm,
      weightInKg,
    } = req.body;

    // Perform the necessary operations to update the user's profile in the database
    // Replace the SQL query and parameters with your own logic
    const updatedUser = await pool.query(
      "UPDATE patient SET email = $1, name = $2, date_birth_mmddaaaa = $3, heightincm = $4, weightinkg = $5 WHERE id = $6 RETURNING *",
      [
        email,
        name,
        dateOfBirth,
        heightInCm,
        weightInKg,
        userId,
      ]
    );

    // Return the updated user data
    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await pool.query("SELECT * FROM patient WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the password is correct
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        userId: user.rows[0].id,
      },
      "secretkey",
      {
        expiresIn: "1h",
      }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/api/sitWvStand", authenticateUser, async (req, res) =>{
  try{
    const userId = req.userId;
    const sitStand = await pool.query(
      `SELECT initialpulsation, finalpulsation, date1test, countcycles, testpercentage FROM "1mstst" WHERE idpatient= $1 ORDER BY date1test DESC`,
      [userId]
    );

    res.json(sitStand.rows.slice(0,2));
  }catch(err){
    console.error(err.message);
    res.status(500).json({message: "Sit to Stand fetch error DB"});
  };
});

app.get("/api/walkWvTest", authenticateUser, async (req, res) => {
  try{
    const userId = req.userId;
    const walkResults = await pool.query(
      `SELECT initialpulsation, finalpulsation, date6test, numbersteps, distance, testpercent FROM sixmwt WHERE idpatient = $1 ORDER BY date6test DESC`,
      [userId]
    );

    res.json(walkResults.rows.slice(0, 2));
  }catch(err){
    console.error(err.message);
    res.status(523).json({message: "Walk Test fetch error DB"});
  };
});

app.get("/api/allSitData", authenticateUser, async (req, res)=>{
  try{
    const userId = req.userId;
    const sitResults = await pool.query(
      `SELECT initialpulsation, finalpulsation, date1test, countcycles, testpercentage FROM "1mstst" WHERE idpatient= $1 ORDER BY date1test DESC`,
      [userId]
    );

    res.json(sitResults.rows.slice(0,7));
  }catch(err){
    console.error(err.message);
    res.status(500).send({message: "All sit data fecth error DB"});
}});

app.get("/api/allWalkData" , authenticateUser, async(req, res)=>{
  try{
    const userId = req.userId;
    const walkResults = await pool.query(
      `SELECT initialpulsation, finalpulsation, date6test, numbersteps, distance, testpercent FROM sixmwt WHERE idpatient = $1 `,
      [userId]
    );

    res.json(walkResults.rows.slice(0,7));
  }catch(err){
    console.error(err.message);
    res.status(500).send({message: "All walk data fecth error DB"});
  }
});


app.get("/api/userData", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;

    // Retrieve user data from the database
    const user = await pool.query(
      "SELECT name, email, date_birth_mmddaaaa, copd_severity, heightincm, weightinkg, role FROM patient WHERE id = $1",
      [userId]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});
app.get("/api/record", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const records = await pool.query(
      "SELECT sd.value, sd.timestamp, s.sensor_purpose FROM sensordetect sd INNER JOIN sensors s ON sd.idsensor = s.id WHERE sd.idpatient = $1 ORDER BY sd.timestamp DESC",
      [userId]
      );
      
      res.json(records.rows.slice(0, 4));
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server Error" });
    }
  });


app.get("/api/cat", authenticateUser , async (req, res) => {
  try{
    const userId = req.userId;

    const cat = await pool.query(
      `SELECT * FROM cat WHERE patientid = $1 ORDER BY id DESC`,
      [userId]
    );
    res.json(cat.rows[0])
  }catch(err){
    console.error(err.message);
    res.status(506).json({message: "cat fetch failed DB"});
  }
})


app.get("/api/allRecords", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;

    const records = await pool.query(
      "SELECT sd.value, sd.timestamp, s.sensor_purpose FROM sensordetect sd INNER JOIN sensors s ON sd.idsensor = s.id WHERE sd.idpatient = $1 ORDER BY sd.timestamp ASC",
      [userId]
    );

    res.json(records.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "allRecords Server Error" });
  }
});

app.get("/api/getSensor/:id", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const sensorId = parseInt(req.params.id);

    if (isNaN(sensorId)) {
      // Invalid sensorId, return an appropriate error response
      return res.status(400).json({ message: "Invalid sensorId" });
    }

    const records = await pool.query(
      "SELECT sd.value, sd.timestamp, s.sensor_purpose FROM sensordetect sd INNER JOIN sensors s ON sd.idsensor = s.id WHERE sd.idsensor = $1 AND sd.idpatient = $2 ORDER BY sd.timestamp DESC",
      [sensorId, userId]
    );

    res.json(records.rows.slice(0, 7));
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "getSensor/:id Error" });
  }
});

app.get("/api/getFaq" , async (req, res) => {
  try{

    const faq = await pool.query("SELECT * FROM faq");

    res.json(faq.rows.slice(0,8));
  } catch(err){
    console.log(err.message);
    res.status(500).json({message : "faq node failed"});
  }
})




// Middleware to authenticate the user
function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.userId = user.userId;
    next();
  });
}

// Start the server
app.listen(5001, () => {
  console.log("Server listening on port 5001");
});
