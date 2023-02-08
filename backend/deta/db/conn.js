const mongoose = require("mongoose");

const Db =
"mongodb+srv://User:07yE5tT4BoijtUBI@hiketours.hgoxcpn.mongodb.net/HikeTours?retryWrites=true&w=majority";

mongoose.connect(Db, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
console.log("Successfully connected to MongoDB.");
});

connection.on("error", function (error) {
console.error("Error connecting to MongoDB:", error);
});

module.exports = connection;