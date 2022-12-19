const express = require("express");
// Routes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /routes.
const Routes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the Routs.
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
 
// This section will help you get a single routes by name
Routes.route("/api/:name").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { name: (req.params.name) };
 db_connect
   .collection("Routen")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new route.
Routes.route("/api/add").post(function (req, res) {
 let db_connect = dbo.getDb();
 let myobj = {
  type: req.body.type,
  name: req.body.name,
  crs: req.body.crs,
  features: req.body.features,
 };
 db_connect.collection("Routen").insertOne(myobj, function (err, result) {
   if (err) throw err;
   res.json(result);
 });
});
 
// This section will help you update a route by name.
Routes.route("/api/update/:name").post(function (req, response) {
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
 
// This section will help you delete a route
Routes.route("/api/delete/:name").delete((req, response) => {
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