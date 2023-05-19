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
        userId, // Assuming you have user authentication and the user ID is available in the request object
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
app.get("/api/records", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;

    const records = await pool.query(
      "SELECT paco2, pao2, respiratory_freq, temperature, timestamp FROM dailyrecords WHERE idpatient = $1 ORDER BY timestamp DESC",
      [userId]
    ); 

    res.json(records.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});


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
