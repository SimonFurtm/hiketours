const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;

const FeatureSchema = new mongoose.Schema({
  _id: {
    $oid: {
      type: ObjectId,
    },
  },
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  crs: {
    type: {
      type: String,
    },
    properties: {
      name: {
        type: String,
      },
    },
  },
  features: {
    type: [mongoose.Schema.Types.Mixed],
  },
  info: {
    type: String,
  },
  Modi: {
    Sport: {
      color: {
        type: String,
      },
      keywords: {
        type: String,
      },
      addition: {
        type: String,
      },
    },
    Tourismus: {
      color: {
        type: String,
      },
      keywords: {
        type: String,
      },
      addition: {
        type: String,
      },
    },
    Kinder: {
      color: {
        type: String,
      },
      keywords: {
        type: String,
      },
      addition: {
        type: String,
      },
    },
  },
});

module.exports = mongoose.model("Route", FeatureSchema);
