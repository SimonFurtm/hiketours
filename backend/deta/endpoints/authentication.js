const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongodb = require('mongodb');

const auth = express.Router();

auth.use(cors());
auth.use(bodyParser.json());

auth.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  let db = dbo.getDb();
  try {
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Incorrect email or password',
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).send({
        success: false,
        message: 'Incorrect name or password',
      });
    }
    res.status(200).send({
      success: true,
      message: 'Login successful',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error logging in'+error,
    });
  }
});

auth.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    const result = await db.collection('Users').insertOne(newUser);
    res.status(201).send({
      success: true,
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error registering user',
    });
  }
});

module.exports = auth;
