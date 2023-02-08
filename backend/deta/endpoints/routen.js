const express = require("express");
const mongoose = require("mongoose");
const Routes = express.Router();
const cors = require("cors");
const connection = require("../db/conn");

const Route = require("../models/Route");

Routes.route("/api/allroutes").get(function (req, res) {
  Route.find({}, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

Routes.route("/api/get/route/:name").get(function (req, res) {
  Route.findOne({ name: req.params.name }, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

Routes.route("/api/add/route").post(function (req, res) {
  const newRoute = new Route(req.body);
  newRoute.save(function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

Routes.route("/api/update/route/:name").patch(function (req, response) {
  Route.findOneAndUpdate(
    { name: req.params.name },
    req.body,
    { new: true },
    function (err, result) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(result);
    }
  );
});

Routes.route("/api/delete/route/:name").delete((req, response) => {
  Route.deleteOne({ name: req.params.name }, function (err) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json({ message: "Route deleted successfully" });
  });
});

module.exports = Routes;
