const express = require("express");
const cors = require("cors");

const app = express();
const port = 7000;

app.use(cors());
// get driver connection
const dbo = require("./db/conn");

app.use(require("./endpoints/routen"));
app.use(require("./endpoints/datapoints"));
app.use(require("./endpoints/authentication"));

//All origin headers

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json("Everythings going well. :)");
  }
  next();
});
/*Some orgin headers
app.use((req, res, next) => {
  const allowedOrigins = ['https://zk2ezn.deta.dev', 'hiketours.software'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});*/

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connect(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});

connection.once("open", function () {
  console.log("Successfully connected to MongoDB.");
});
connection.on("error", function (error) {
  console.error("Error connecting to MongoDB:", error);
});

module.exports = app;