const { MongoClient, ServerApiVersion } = require('mongodb');
const Db = "mongodb+srv://User:07yE5tT4BoijtUBI@hiketours.hgoxcpn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(Db, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("HikeTours");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};

