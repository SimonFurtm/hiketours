const express = require("express");
const Routes = express.Router();
const dbo = require("../db/conn");
//const ObjectId = require("mongodb").ObjectId;

Routes.route("/api/allroutes").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("Routen")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

Routes.route("/api/get/route/:name").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { name: (req.params.name) };
  db_connect
    .collection("Routen")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

Routes.route("/api/add/route").post(function (req, res) {
  let db_connect = dbo.getDb();
  let myobj = req.body;
  db_connect.collection("Routen").insertOne(myobj, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

Routes.route("/api/update/route/:name").patch(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { name: (req.params.name) };
  if (keys(req.body).length === 0) {
    return response.json({ message: "No values provided for update" });
  }
  let newvalues = { $set: req.body };
  db_connect
    .collection("Routen")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

Routes.route("/api/delete/route/:name").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { name: (req.params.name) };
  db_connect.collection("Routen").deleteOne
    (myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
});

module.exports = Routes;
