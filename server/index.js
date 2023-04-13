const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Successfully connected to the database:', res.rows[0].now);
  }
});


//Midleware
app.use(cors());
app.use(express.json());

// Start the Express server
app.listen(5001, () => {
  console.log('Server is running on port 5001');

});


app.post('/api/login', async (req, res) => {
  const {username,password} = req.body;
  const user = await pool.query('SELECT * FROM patient WHERE username = $1', [username]);
  if (user.rows.length === 0) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }
  console.log(user.rows[0].password);
  console.log(password);
  const isValidPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: 'Invalid credentials'
    });
  }

  const token = jwt.sign({
    userId: user.rows[0].id
  }, 'secretkey', {
    expiresIn: '1h'
  });

  res.json({
    token
  });
});

// Middleware to protect routes that require authentication
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: 'Authorization header missing'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, 'secretkey');
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};

app.get('/api/protected', authenticateUser, (req, res) => {
  res.json({
    message: 'This is a protected route'
  });
});

// GET all patients
app.get('/api/patient', async (req, res) => {
  try {
    const patient = await pool.query('SELECT * FROM patient');
    res.json(patient.rows);
  } catch (error) {
    console.error(error.message)
  }
})

//Get one patient
app.get('/api/patient/:id', async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const patient = await pool.query('SELECT * FROM patient WHERE id = $1', [id]);
    res.json(patient.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//Insert a patient
app.post('/api/patient', async (req, res) => {
  try {
      // Hash the password
    const saltRounds = 10;
      
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const patient = await pool.query(
      'INSERT INTO patient (first_name, last_name, date_of_birth, email, phone_number, address, doctor_id, gender, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [req.body.firstName, req.body.lastName, req.body.dateOfBirth, req.body.email, req.body.phoneNumber, req.body.address, req.body.doctor_id, req.body.gender, req.body.username, hashedPassword]
    );
    res.json(patient.rows);
  } catch (error) {
    console.error(error.message);
  }
})        

//Update a patient 
app.put('/api/patient/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const patient = await pool.query(
      'UPDATE patient SET first_name = $1, last_name = $2, date_of_birth = $3, email = $4, phone_number = $5, address = $6, doctor_id = $7, gender = $8 WHERE id = $9',
      [req.body.first_name, req.body.last_name, req.body.date_of_birth, req.body.email, req.body.phone_number, req.body.address, req.body.doctor_id, req.body.gender, id]
    );
    res.json("patient updated");
  } catch (error) {
    console.error(error.message);

  }
})

//Delete a patient
app.delete('/api/patient/:id', async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const patient = await pool.query(
      'DELETE FROM patient WHERE id = $1',
      [id]
    );
    res.json("patient deleted");
  } catch (error) {
    console.error(error.message);

  }
})