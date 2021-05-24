const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    campaignId: String,
    userId: String,
    usecaseList: [
      {
        _id: false,
        id: String,
        status: String,
        intentList: [
          {
            _id: false,
            id: String,
            status: String,
          },
        ],
      },
    ],
    intentList: [
      {
        _id: false,
        id: String,
        status: String,
      },
    ],
    sessionList: [],
    // messageId: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Result', resultSchema);
