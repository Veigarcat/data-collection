const axios = require('axios');
const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const userDao = require('../daos/user');
const campaignDao = require('../daos/campaign');
const resultDao = require('../daos/result');

const { API_DOMAIN_ASR } = require('../configs');

const { STATUS_RESULT, STATUS_USER_CAMPAIGN } = require('../constants/params');

const searchUsers = async (query) => {
  const result = await userDao.searchUsers(query);
  return result;
};

const searchAllByKey = async (query) => {
  const result = await userDao.searchAllByKey(query);
  return result;
};

const getAllUser = async () => {
  const users = await userDao.findAllUser();
  return users;
};

const getUser = async (condition) => {
  const user = await userDao.findUser(condition);
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);
  return user;
};

const userJoinCampaign = async ({ userId, campaignId }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);

  const user = await userDao.findUser({ _id: userId });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);
  const userRegister = campaign.participant.find(
    (parItem) => parItem.userId === userId,
  );
  if (userRegister) throw new CustomError(errorCodes.REGISTERED);

  const participant = [
    ...campaign.participant,
    { userId, status: STATUS_USER_CAMPAIGN.JOIN },
  ];
  const resultJoinCampaign = await campaignDao.updateCampaign(campaignId, {
    participant,
  });
  if (campaign.messageObject === 'bot' && campaign.messageType === 'msg_text') {
    const resultExist = await resultDao.findResult({
      campaignId,
      userId,
    });
    if (!resultExist) {
      if (campaign.usecaseList.length > 0) {
        await resultDao.createResult({
          campaignId,
          userId,
          usecaseList: [
            {
              id: campaign.usecaseList[0].id,
              status: STATUS_RESULT.PROCESSING,
            },
          ],
        });
      }
      if (campaign.intentList.length > 0) {
        await resultDao.createResult({
          campaignId,
          userId,
        });
      }
    }
  }
  return { resultJoinCampaign };
};

const userLeaveCampaign = async ({ userId, campaignId }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);

  const user = await userDao.findUser({ _id: userId });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);
  if (
    campaign.participant.findIndex((parItem) => parItem.userId === userId) >= 0
  ) {
    const arrUser = campaign.participant.filter(
      (item) => item.userId !== userId,
    );
    const result = await campaignDao.updateCampaign(campaignId, {
      participant: arrUser,
    });
    return result;
  }
  throw new CustomError(errorCodes.UNREGISTER);
};

const handleAcceptInvite = async ({ userId, campaignId }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);

  const user = await userDao.findUser({ _id: userId });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);
  const userParticipant = campaign.participant.find(
    (parItem) => parItem.userId === userId,
  );
  if (!userParticipant) throw new CustomError(errorCodes.YOU_ARE_NOT_INVITED);
  if (userParticipant.status === STATUS_USER_CAMPAIGN.JOIN)
    throw new CustomError(errorCodes.YOU_JOINED);

  const participant = campaign.participant.reduce((accItem, curItem) => {
    if (curItem.userId === userId) {
      curItem.status = STATUS_USER_CAMPAIGN.JOIN;
    }
    return [...accItem, curItem];
  }, []);
  const resultJoinCampaign = await campaignDao.updateCampaign(campaignId, {
    participant,
  });
  if (campaign.messageObject === 'bot' && campaign.messageType === 'msg_text') {
    const resultExist = await resultDao.findResult({
      campaignId,
      userId,
    });

    if (!resultExist) {
      if (campaign.usecaseList.length > 0) {
        await resultDao.createResult({
          campaignId,
          userId,
          usecaseList: [
            {
              id: campaign.usecaseList[0].id,
              status: STATUS_RESULT.PROCESSING,
            },
          ],
        });
      }
      if (campaign.intentList.length > 0) {
        if (campaign.intentList.length > 0) {
          await resultDao.createResult({
            campaignId,
            userId,
          });
        }
      }
    }
  }
  return { resultJoinCampaign };
};
const editUserExternal = async ({ accessToken, data }) => {
  Promise.all([
    // await axios({
    //   method: 'PUSH',
    //   url: `${API_DOMAIN_SLU}/api/sso/updateUser`,
    //   data: { accessToken, user },
    // }),
    await axios({
      method: 'PUT',
      url: `${API_DOMAIN_ASR}/api/sso/updateUser`,
      data: { accessToken, user: data },
    }),
  ]);
};
const editUser = async ({ accessToken, data, userId }) => {
  const userUpdate = await userDao.updateUser(userId, data);
  if (!userUpdate) {
    throw new CustomError(errorCodes.USER_NOT_FOUND);
  }
  await editUserExternal({ accessToken, data });
  return userUpdate;
};
module.exports = {
  searchUsers,
  getUser,
  userJoinCampaign,
  userLeaveCampaign,
  handleAcceptInvite,
  searchAllByKey,
  getAllUser,
  editUser,
};
