const { MongoClient, ServerApiVersion } = require("mongodb");

const Db =
  "mongodb+srv://User:07yE5tT4BoijtUBI@hiketours.hgoxcpn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

var _db;

module.exports = {
  connectToServer: async function () {
    try {
      await client.connect();
      _db = client.db("HikeTours");
      console.log("Successfully connected to MongoDB.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  },

  getDb: function () {
    return _db;
  },
};
