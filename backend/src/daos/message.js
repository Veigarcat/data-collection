const {
  Types: { ObjectId },
} = require('mongoose');
const Message = require('../models/message');

const getListAllMessage = async ({ ssoUserId, appId, campaignId }) => {
  const result = await Message.find({
    $and: [
      { appId },
      { campaignId },
      { $or: [{ 'receiver.user': ssoUserId }, { 'sender.user': ssoUserId }] },
    ],
  }).lean();
  return result;
};

const findMessageByUserId = async (query) => {
  const { appId, ssoUserId, campaignId, sort } = query;
  let { limit } = query;
  limit = Number.parseInt(limit, 10);

  const count = await Message.countDocuments({
    $and: [
      { appId },
      { campaignId },
      { $or: [{ 'receiver.user': ssoUserId }, { 'sender.user': ssoUserId }] },
    ],
  });

  const result = await Message.find({
    $and: [
      { appId },
      { campaignId },
      { $or: [{ 'receiver.user': ssoUserId }, { 'sender.user': ssoUserId }] },
    ],
  })
    .limit(limit || null)
    .sort(
      sort
        ? JSON.parse(
            `{${sort
              .map((element) => {
                const field = element.substring(0, element.lastIndexOf('_'));
                const value =
                  element.substring(element.lastIndexOf('_') + 1) === 'asc'
                    ? 1
                    : -1;
                return `"${field}":${value}`;
              })
              .join(',')}}`,
          )
        : { _id: 1 },
    )
    .lean();
  return { messages: result, count };
};

const getSkipMessage = async (query) => {
  const { appId, ssoUserId, messageId, campaignId } = query;
  let { limit } = query;
  limit = Number.parseInt(limit, 10);

  const result = await Message.find({
    appId,
    campaignId,
    $or: [{ 'receiver.user': ssoUserId }, { 'sender.user': ssoUserId }],
    _id: {
      $lt: messageId,
    },
  })
    .sort({ createdAt: -1 })
    .limit(limit);
  return result;
};

const createMessage = async (message) => {
  const result = await Message.create(message);
  return result;
};

const findMessage = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const intent = await Message.findById(condition);
    return intent;
  }

  if (typeof condition === 'object' && condition !== null) {
    const intent = await Message.findOne(condition);
    return intent;
  }
  return null;
};

const updateMessage = async (id, data) => {
  const result = await Message.findByIdAndUpdate(id, data, {
    new: false,
  });
  return result;
};

const getMsgListByIntent = async ({
  intentId,
  campaignId,
  ssoUserId,
  usecaseId,
}) => {
  const sumMsg = await Message.find({
    campaignId: campaignId.toString(),
    'nlu.intentId': intentId,
    'sender.user': ssoUserId,
    usecaseId,
  }).countDocuments();
  const sumMsgConfirm = await Message.find({
    usecaseId,
    campaignId: campaignId.toString(),
    'nlu.intentId': intentId,
    'receiver.user': ssoUserId,
    isConfirm: true,
  }).countDocuments();
  return { sumMsg, sumMsgConfirm };
};

const getStatisMsgListByUsecase = async ({
  usecaseId,
  campaignId,
  ssoUserId,
}) => {
  const sumMsg = await Message.find({
    campaignId: campaignId.toString(),
    usecaseId,
    'sender.user': ssoUserId,
  }).countDocuments();
  const sumMsgConfirm = await Message.find({
    campaignId: campaignId.toString(),
    usecaseId,
    'receiver.user': ssoUserId,
    isConfirm: true,
  }).countDocuments();
  return { sumMsg, sumMsgConfirm };
};

module.exports = {
  createMessage,
  findMessageByUserId,
  getListAllMessage,
  getSkipMessage,
  findMessage,
  updateMessage,
  getMsgListByIntent,
  getStatisMsgListByUsecase,
};
