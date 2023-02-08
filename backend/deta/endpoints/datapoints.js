const express = require("express");

const DataPoints = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

DataPoints.route("/api/alldatapoints").get(function (req, res) {
  try {
    let db_connect = dbo.getDb();

    db_connect
      .collection("DataPoints")
      .find({})
      .toArray(function (err, result) {
        res.json(result);
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error: ' + error,
    });
  }

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
    title:req.body.title,
    type: req.body.type,
    coordinate: {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    },
    details: req.body.details
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

  if (req.body.details) {
    newvalues.$set.details = req.body.details.map(d => ({ name: d.name, info: d.info }));
  }
  if (req.body.coordinate) {
    newvalues.$set.coordinate = {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    };
  }

  db_connect
    .collection("DataPoints")
    .updateOne({ title: req.params.title }, {
      $set: {
        type: req.params.title,
        coordinate: newvalues.$set.coordinate || {},
        details: newvalues.$set.details || []
      }
    }, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

DataPoints.route("/api/deleteDP/:title").delete((req, response) => {
  let db_connect = dbo.getDb();

  let myquery = { title : (req.body.title)};

  db_connect.collection("DataPoints").deleteOne
    (myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
});

module.exports = DataPoints;