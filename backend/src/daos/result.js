const {
  Types: { ObjectId },
} = require('mongoose');
const Result = require('../models/result');
const Campaign = require('../models/campaign');
const Message = require('../models/message');

const createResult = async (resultNew) => {
  const result = await Result.create(resultNew);
  return result;
};

const updateResult = async (resultId, data) => {
  const result = await Result.findByIdAndUpdate(resultId, data, {
    new: false,
  });
  return result;
};

const findResult = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const result = await Result.findById(condition).lean();
    return result;
  }
  if (typeof condition === 'object' && condition !== null) {
    const result = await Result.findOne(condition).lean();
    return result;
  }

  return null;
};

const getStatisticCountUserOverView = async ({ userId, ssoUserId }) => {
  const totalMessage = await Message.find({
    'sender.user': ssoUserId,
  }).countDocuments();

  const resultQuery = await Campaign.aggregate([
    {
      $match: {
        participant: { $elemMatch: { userId } },
      },
    },
    {
      $project: {
        _id: {
          $toString: '$_id',
        },
        userId,
        status: 1,
        usecaseList: 1,
        intentList: 1,
      },
    },
    {
      $lookup: {
        from: 'results',
        let: {
          campaignId: '$_id',
          userId: '$userId',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$userId', '$$userId'] },
                  { $eq: ['$campaignId', '$$campaignId'] },
                ],
              },
            },
          },
        ],
        as: 'result',
      },
    },
    {
      $addFields: {
        usecaseListConfirm: '$result.usecaseList',
        intentListConfirm: '$result.intentList',
      },
    },
  ]);

  const runningCampaign = resultQuery.filter(
    (item) => item.status === 'running',
  ).length;
  const upcomingCampaign = resultQuery.filter(
    (item) => item.status === 'waiting',
  ).length;
  const finishCampaign = resultQuery.filter(
    (item) => item.status === 'stop' || item.status === 'pause',
  ).length;
  const totalUsecase = resultQuery.reduce((acc, cur) => {
    return acc + cur.usecaseList.length;
  }, 0);
  const totalUsecaseChat = resultQuery.reduce((acc, cur) => {
    return acc + cur.usecaseListConfirm.length;
  }, 0);
  const totalIntent = resultQuery.reduce((acc, cur) => {
    const intentUc = cur.usecaseList.reduce((ucAcc, ucCur) => {
      if (ucCur.intentList.length) {
        return ucAcc + ucCur.intentList.length;
      }
      return ucAcc;
    }, 0);
    return acc + cur.intentList.length + intentUc;
  }, 0);
  const totalIntentChat = resultQuery.reduce((acc, cur) => {
    const intentUc = cur.usecaseListConfirm.reduce((ucAcc, ucCur) => {
      if (ucCur.intentList && ucCur.intentList.length) {
        return ucAcc + ucCur.intentList.length;
      }
      return ucAcc;
    }, 0);
    return acc + cur.intentListConfirm.length + intentUc;
  }, 0);

  const result = {
    totalCampaign: resultQuery.length,
    runningCampaign,
    upcomingCampaign,
    finishCampaign,
    totalUsecase,
    totalUsecaseChat,
    totalIntent,
    totalIntentChat,
    totalMessage,
  };
  return result;
};
module.exports = {
  createResult,
  updateResult,
  findResult,
  getStatisticCountUserOverView,
};
