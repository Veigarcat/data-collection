// const axios = require('axios');

const messageDao = require('../daos/message');
const campaignDao = require('../daos/campaign');
const errorCodes = require('../errors/code');
const CustomError = require('../errors/CustomError');
// const { LIST_MESSAGE } = require('../constants/params');

// const mappingArrayMessage = (arr1 = [], arr2 = []) => {
//   const mappingArray = arr1.reduce((acc, cur) => {
//     const elementExists = arr2.find((item) => item.messageId === cur.id);
//     if (elementExists) {
//       return [
//         ...acc,
//         {
//           ...elementExists,
//           ...cur,
//         },
//       ];
//     }
//     return acc;
//   }, []);
//   return mappingArray;
// };

// const axiosInstance = axios.create({
//   responseType: 'json',
//   timeout: 15 * 1000,
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDU0NGQzOTYwZTZhNjVlN2NmZTgyZjkiLCJhcHBJZCI6IjQ0YjA4MTg5LWVhMTktNGRmZS1iNTQ5LWJkODdkOGI4YWM4ZCJ9.VJomJ9oSaZ6P-pUY9Sulc3pNJsq7ZsA4xkH6LDLbAxWWRq_ieHjqoAt9FRH0vpFy2bsqh-dwsBau4J9ZImpYfQ`,
//   },
// });

const getListAllMessage = async ({ appId, ssoUserId, campaignId }) => {
  // const options = {
  //   appId: '44b08189-ea19-4dfe-b549-bd87d8b8ac8d',
  //   limit: 20,
  //   sort: 'createdAt_desc',
  // };
  // const { data, status } = await axiosInstance({
  //   method: 'GET',
  //   url: 'https://dev-chat.iristech.club/api/v1/messages',
  //   params: options,
  // });
  const listMsg = await messageDao.getListAllMessage({
    ssoUserId,
    appId,
    campaignId,
  });
  return listMsg;
};

const findMessageByUserId = async ({
  appId,
  ssoUserId,
  campaignId,
  limit,
  sort,
}) => {
  const listMsg = await messageDao.findMessageByUserId({
    ssoUserId,
    appId,
    campaignId,
    limit,
    sort,
  });
  return listMsg;
};

const getSkipMessage = async ({
  appId,
  ssoUserId,
  messageId,
  limit,
  campaignId,
}) => {
  const listMsg = await messageDao.getSkipMessage({
    appId,
    ssoUserId,
    messageId,
    limit,
    campaignId,
  });
  return listMsg;
};

const createMessage = async (message) => {
  const result = await messageDao.createMessage(message);
  return result;
};

const updateMessage = async (message) => {
  const { messageId, textComment, nlu } = message;
  const resultFindById = await messageDao.findMessage({ messageId });

  if (!resultFindById) throw new CustomError(errorCodes.MESSAGE_NOT_FOUND);
  const result = await messageDao.updateMessage(resultFindById._id, {
    textComment: textComment || resultFindById.textComment,
    nlu: nlu || resultFindById.nlu,
  });
  return result;
};

const updateIsConfirmMessage = async (message) => {
  const { messageId, isConfirm } = message;
  const resultFindById = await messageDao.findMessage({ messageId });

  if (!resultFindById) throw new CustomError(errorCodes.MESSAGE_NOT_FOUND);
  const result = await messageDao.updateMessage(resultFindById._id, {
    isConfirm,
  });
  return result;
};

const getMsgListByIntent = async ({
  intentId,
  campaignId,
  ssoUserId,
  usecaseId,
}) => {
  const campaign = await campaignDao.findCampaign({ _id: campaignId });
  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }
  const result = await messageDao.getMsgListByIntent({
    usecaseId,
    intentId,
    campaignId,
    ssoUserId,
  });
  return result;
};

const getStatisMsgListByUsecase = async ({
  usecaseId,
  campaignId,
  ssoUserId,
}) => {
  const campaign = await campaignDao.findCampaign({ _id: campaignId });
  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }
  const result = await messageDao.getStatisMsgListByUsecase({
    usecaseId,
    campaignId,
    ssoUserId,
  });
  return result;
};

module.exports = {
  getListAllMessage,
  findMessageByUserId,
  getSkipMessage,
  createMessage,
  updateMessage,
  updateIsConfirmMessage,
  getMsgListByIntent,
  getStatisMsgListByUsecase,
};
