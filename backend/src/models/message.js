const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sessionId: String,
    messageId: String(),
    appId: String(),
    campaignId: String(),
    usecaseId: String(),
    textComment: String(),
    isConfirm: Boolean(),
    sender: {
      user: String,
      bot: String,
    },
    receiver: {
      user: String(),
    },
    nlu: {
      intentId: String(),
      confidence: Number(),
    },
    content: {
      text: String,
      attachment: {},
      attachments: {
        type: [],
        default: undefined,
      },
    },
    isFirst: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('message', messageSchema);
