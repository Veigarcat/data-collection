const {
  Types: { ObjectId },
} = require('mongoose');
const Campaign = require('../models/campaign');
const { pagination } = require('../constants');

const getAllCampaign = async (page, records) => {
  if (page === null) {
    page = pagination.pageNumber;
  }
  if (records === null) {
    records = pagination.recordNumber;
  }
  page = Number.parseInt(page, 10);
  records = Number.parseInt(records, 10);
  const totalRecords = await Campaign.countDocuments();

  const campaigns = await Campaign.find({})
    .skip((page - 1) * records)
    .limit(records);

  return {
    totalRecords,
    campaigns,
  };
};
const searchCampaign = async (query) => {
  let { page, records } = query;
  const {
    key,
    userId,
    participantStatus,
    status,
    messageType,
    messageObject,
    scope,
    collectType,
  } = query;
  if (page === null) {
    page = pagination.pageNumber;
  }
  if (records === null) {
    records = pagination.recordNumber;
  }
  page = Number.parseInt(page, 10);
  records = Number.parseInt(records, 10);

  let objectQuery = {};
  if (key) {
    objectQuery = {
      ...objectQuery,
      name: new RegExp(key, 'gi'),
    };
  }
  if (participantStatus) {
    switch (participantStatus) {
      case 'myCampaign': // chiến dịch của bạn
        objectQuery = {
          ...objectQuery,
          participant: { $elemMatch: { userId } },
        };
        break;
      case 'otherCampaign': // chiến dịch chưa tham gia
        objectQuery = {
          ...objectQuery,
          participant: { $not: { $elemMatch: { userId } } },
        };
        break;
      default:
        break;
    }
  }

  if (status) {
    switch (status) {
      case 'waiting': {
        objectQuery = {
          ...objectQuery,
          status: 'waiting',
        };
        break;
      }
      case 'running': {
        objectQuery = {
          ...objectQuery,
          status: 'running',
        };
        break;
      }
      case 'finished': {
        objectQuery = {
          ...objectQuery,
          status: {
            $in: ['stop', 'pause'],
          },
        };
        break;
      }
      default:
        break;
    }
  }
  if (messageType && messageType !== 'total') {
    objectQuery = {
      ...objectQuery,
      messageType,
    };
  }
  if (messageObject && messageObject !== 'total') {
    objectQuery = {
      ...objectQuery,
      messageObject,
    };
  }
  if (scope && scope !== 'total') {
    objectQuery = {
      ...objectQuery,
      scope,
    };
  }
  if (collectType && collectType !== 'total') {
    objectQuery = {
      ...objectQuery,
      collectType,
    };
  }
  const totalRecords = await Campaign.countDocuments(objectQuery);
  const campaigns = await Campaign.find(objectQuery)
    .skip((page - 1) * records)
    .limit(records);

  return {
    totalRecords,
    campaigns,
  };
};

const createCampaign = async (campaign) => {
  const result = await Campaign.create(campaign);
  return result;
};

const findAllCampaign = async () => {
  const campaigns = await Campaign.find().lean();
  return campaigns;
};

const findCampaign = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const campaign = await Campaign.findById(condition).lean();
    return campaign;
  }

  if (typeof condition === 'object' && condition !== null) {
    const campaign = await Campaign.findOne(condition).lean();
    return campaign;
  }
  return null;
};

const findOneUsecase = async (condition) => {
  if (typeof condition === 'object' && condition !== null) {
    const campaign = await Campaign.find(condition).distinct('usecaseList.0');
    return campaign;
  }
  return null;
};
const findIntentByUsecaseId = async (condition) => {
  if (typeof condition === 'object' && condition !== null) {
    const campaign = await Campaign.find(condition).distinct(
      'usecaseList.0.intentList',
    );
    return campaign;
  }
  return null;
};

const updateCampaign = async (campaignId, data) => {
  const campaign = await Campaign.findByIdAndUpdate(campaignId, data, {
    new: false,
  });
  return campaign;
};

const deleteCampaign = async (campaignId) => {
  const result = await Campaign.findByIdAndDelete(campaignId);
  return result;
};

module.exports = {
  getAllCampaign,
  searchCampaign,
  createCampaign,
  findCampaign,
  updateCampaign,
  deleteCampaign,
  findAllCampaign,
  findIntentByUsecaseId,
  findOneUsecase,
};
