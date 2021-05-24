const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    name: String,
    desc: String,
    scope: String,
    status: String,
    timeStart: Date,
    timeEnd: Date,
    criteria: [
      {
        _id: false,
        id: String,
        point: Number,
        name: String,
      },
    ],
    participant: [
      {
        _id: false,
        userId: String,
        status: String,
      },
    ],
    usecaseList: [
      {
        _id: false,
        id: String,
        name: String,
        desc: String,
        intentList: [
          {
            _id: false,
            id: String,
          },
        ],
      },
    ],
    intentList: [
      {
        _id: false,
        id: String,
      },
    ],
    messageType: String,
    messageObject: String,
    // campaignType: String,
    collectType: String,
    appId: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Campaign', campaignSchema);
