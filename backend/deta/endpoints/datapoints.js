const express = require("express");

const DataPoints = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

DataPoints.route("/api/alldatapoints").get(function (req, res) {
  let db_connect = dbo.getDb();
  if (!db_connect) return res.json({ message: "Database connection could not be established!" });
  db_connect
    .collection("DataPoints")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

DataPoints.route("/api/getdp/:title").get(function (req, res) {
  let db_connect = dbo.getDb();
  if (!db_connect) return res.json({ message: "Database connection could not be established" });
  let myquery = { title: (req.params.title) };
  db_connect
    .collection("DataPoints")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

DataPoints.route("/api/add/datapoint").post(function (req, res) {
  let db_connect = dbo.getDb();
  if (!db_connect) return res.json({ message: "Database connection could not be established" });
  let myobj = {
    title: req.body.title,
    description: req.body.description,
    geolocation: req.body.geolocation
  };
  db_connect.collection("DataPoints").insertOne(myobj, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

DataPoints.route("/api/updateDP/:title").patch(function (req, response) {
  let db_connect = dbo.getDb();
  if (!db_connect) return response.json({ message: "Database connection could not be established" });
  let myquery = { title: (req.params.title) };

  if (Object.keys(req.body).length === 0) {
    return response.json({ message: "No values provided for update" });
  }

  let newvalues = { $set: {} };
  if (req.body.description) {
    newvalues.$set.description = req.body.description;
  }
  if (req.body.geolocation) {
    newvalues.$set.geolocation = req.body.geolocation;
  }

  db_connect
    .collection("DataPoints")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

module.exports = DataPoints;