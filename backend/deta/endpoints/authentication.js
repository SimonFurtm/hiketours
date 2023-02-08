const express = require('express');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const cors = require('cors');
const auth = express.Router();

auth.use(cors);

auth.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json("Everythings going well. :)");
  }
  next();
});

auth.use(bodyParser.json());

auth.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let db = dbo.getDb();
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Incorrect name or password',
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
    let db = dbo.getDb();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { username:username, password: hashedPassword };


    const user = await db.collection('users').findOne({username});

    if (user) {
      return res.status(401).send({
        success: false,
        message: 'Username already in use',
      });
    }

    const result = await db.collection('users').insertOne(newUser);

    console.log(result);
    
    res.status(201).send({
      success: true,
      message: 'User registered successfully',
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error registering user'+error,
    });
  }
});

module.exports = auth;
