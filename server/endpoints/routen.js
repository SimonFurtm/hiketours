const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/api").get(function (req, res) {
 let db_connect = dbo.getDb("HikeTours");
 db_connect
   .collection("Routen")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/api/:name").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { name: (req.params.name) };
 db_connect
   .collection("Routen")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/api/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   was: req.body.was,
 };
 db_connect.collection("Routen").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:name").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { name: (req.params.name) };
 let newvalues = {
   $set: {
     name: req.body.name,
     was: req.body.was,
   },
 };
 db_connect
   .collection("Routen")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:name").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { name: (req.params.name) };
 db_connect.collection("Routen").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});

module.exports = recordRoutes;