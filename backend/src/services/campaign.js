const campaignDao = require('../daos/campaign');
const userDao = require('../daos/user');
const errorCodes = require('../errors/code');
const CustomError = require('../errors/CustomError');
const { LIST_INTENT } = require('../constants/params');

const getListAllCampaign = async () => {
  const result = await campaignDao.findAllCampaign();
  return result;
};

const getInfoCampaign = async (campaignId) => {
  const campaign = await campaignDao.findCampaign({ _id: campaignId });
  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }
  if (campaign.usecaseList.length) {
    const usecaseListNew = campaign.usecaseList.reduce((accUC, curUC) => {
      const intentListNew = curUC.intentList.reduce((accIT, curIT) => {
        const intentExist = LIST_INTENT.find(
          (itemIntent) => itemIntent.id === curIT.id,
        );
        if (intentExist) {
          return [...accIT, intentExist];
        }
        return accIT;
      }, []);
      return [...accUC, { ...curUC, intentList: intentListNew }];
    }, []);

    campaign.usecaseList = usecaseListNew;
  }
  if (campaign.intentList.length) {
    const intentListNew = campaign.intentList.reduce((accIT, curIT) => {
      const intentExist = LIST_INTENT.find(
        (itemIntent) => itemIntent.id === curIT.id,
      );
      if (intentExist) {
        return [...accIT, intentExist];
      }
      return accIT;
    }, []);
    campaign.intentList = intentListNew;
  }
  const userList = await userDao.findAllUser();
  if (campaign.participant.length) {
    const participantListNew = campaign.participant.reduce((acc, cur) => {
      const userExist = userList.find(
        (itemUser) => String(itemUser._id) === cur.userId,
      );
      if (userExist) {
        return [...acc, { ...cur, email: userExist.email }];
      }
      return acc;
    }, []);
    campaign.participant = participantListNew;
  }
  return campaign;
};

const searchCampaign = async (query) => {
  const result = await campaignDao.searchCampaign(query);
  return result;
};

const updateCampaign = async ({ campaignId, data }) => {
  const campaign = await campaignDao.updateCampaign(campaignId, data);
  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }
  return campaign;
};

const createCampaign = async (campaign) => {
  const result = await campaignDao.createCampaign({
    ...campaign,
    status: 'waiting', // đang chờ
  });
  return result;
};

const deleteCampaign = async (campaignId) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  const result = campaignDao.deleteCampaign(campaignId);
  return result;
};

const changeStatusCampaign = async ({ campaignId, status }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }
  const result = await campaignDao.updateCampaign(campaignId, { status });
  return result;
};

module.exports = {
  getListAllCampaign,
  searchCampaign,
  createCampaign,
  deleteCampaign,
  updateCampaign,
  getInfoCampaign,
  changeStatusCampaign,
};
