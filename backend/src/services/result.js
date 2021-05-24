const CustomError = require('../errors/CustomError');
const errorCodes = require('../errors/code');
const messageService = require('./message');
const resultDao = require('../daos/result');
const campaignDao = require('../daos/campaign');
const userDao = require('../daos/user');
const {
  LIST_INTENT,
  CAMPAIGN_TYPE,
  STATUS_RESULT,
} = require('../constants/params');

const getInfoResult = async (condition) => {
  const result = await resultDao.findResult(condition);
  if (!result) throw new CustomError(errorCodes.NOT_FOUND);
  return result;
};

const getIntentsMappingTwoArray = (arr1 = [], arr2 = []) => {
  const intents = arr1.reduce((accIn, curIn) => {
    const intentAssign = arr2.find((intentItem) => intentItem.id === curIn.id);

    if (intentAssign) {
      return [
        ...accIn,
        {
          ...intentAssign,
          ...curIn,
        },
      ];
    }
    return accIn;
  }, []);
  return intents;
};

const getInfoUsecaseById = async ({ campaignId, userId, usecaseId }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }
  const result = await resultDao.findResult({ campaignId, userId });

  if (!result) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }

  const chatUsecase = result.usecaseList.find(
    (ucItem) => ucItem.id === usecaseId,
  );
  if (!chatUsecase) {
    await resultDao.updateResult(result._id, {
      usecaseList: [
        ...result.usecaseList,
        { id: usecaseId, status: STATUS_RESULT.PROCESSING, intentList: [] },
      ],
    });
  }

  const { intentList } = chatUsecase;
  const usecase = campaign.usecaseList.find((item) => item.id === usecaseId);

  const questionIntents = usecase.intentList.reduce((accIn, curIn) => {
    const intentAssign = intentList.findIndex(
      (intentItem) => intentItem.id !== curIn.id,
    );

    if (intentAssign === -1) {
      const intentExist = LIST_INTENT.find(
        (itemIntent) => itemIntent.id === curIn.id,
      );
      return [
        ...accIn,
        {
          ...intentExist,
        },
      ];
    }
    return accIn;
  }, []);

  const infoUsecase = {
    confirm: chatUsecase.confirm || [],
    id: usecase.id,
    desc: usecase.desc,
    name: usecase.name,
    question: questionIntents,
    type: CAMPAIGN_TYPE.USECASE,
  };
  return infoUsecase;
};

const updateResult = async ({ campaignId, userId, data, usecaseId, type }) => {
  const campaign = await campaignDao.findCampaign(campaignId);

  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }

  const result = await resultDao.findResult({ campaignId, userId });
  if (!result) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }

  let response;
  if (type.toUpperCase() === CAMPAIGN_TYPE.USECASE) {
    const { usecaseList } = result;
    const indexUcExist = usecaseList.findIndex((item) => item.id === usecaseId);
    if (indexUcExist >= 0) {
      const newUc = [
        ...usecaseList.slice(0, indexUcExist),
        {
          ...usecaseList[indexUcExist],
          intentList: [...usecaseList[indexUcExist].intentList, data],
        },
        ...usecaseList.slice(indexUcExist + 1),
      ];
      response = await resultDao.updateResult(result._id, {
        usecaseList: newUc,
      });
      return response;
    }
  }

  if (type.toUpperCase() === CAMPAIGN_TYPE.INTENT) {
    const { intentList } = result;
    const newIntents = [...intentList, data];
    response = await resultDao.updateResult(result._id, {
      intentList: newIntents,
    });
    return response;
  }
  throw new Error();
};

const getStatisticCountUserByCampaignId = async ({ campaignId, userId }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);

  const user = await userDao.findUser({ _id: userId });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const resultCampaign = await resultDao.findResult({ campaignId, userId });
  if (!resultCampaign) throw new CustomError(errorCodes.RESULT_NOT_FOUND);

  const total =
    campaign.collectType === 'usecase'
      ? campaign.usecaseList.length
      : campaign.intentList.length;
  const totalChat =
    campaign.collectType === 'usecase'
      ? resultCampaign.usecaseList.length
      : resultCampaign.intentList.length;
  const listMsg = await messageService.getListAllMessage({
    ssoUserId: user.ssoUserId,
    appId: campaign.appId,
    campaignId,
  });

  const totalSession =
    listMsg.filter((item) => item.isFirst === true).length || 0;
  const totalChatSentence = listMsg.length;
  const totalCorrectAnswer = 0; // TODO:
  const totalCorrectAnswerConfirm = 0; // TODO:
  const totalBotCorrect = 0;
  const totalBotIncorrect = 0;
  const totalValidConversation = 2;

  const result = {
    collectType: campaign.collectType,
    total,
    totalChat,
    totalSession,
    totalChatSentence,
    totalCorrectAnswer,
    totalCorrectAnswerConfirm,
    totalBotCorrect,
    totalBotIncorrect,
    totalValidConversation,
    campaign: {
      name: campaign.name,
      collectType: campaign.collectType,
    },
  };
  return result;
};

const getDetailResultUserByCampaignId = async ({ campaignId, userId }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);

  const user = await userDao.findUser({ _id: userId });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const resultCampaign = await resultDao.findResult({ campaignId, userId });
  if (!resultCampaign) throw new CustomError(errorCodes.RESULT_NOT_FOUND);

  let result = [];
  if (campaign.collectType === 'usecase') {
    const confirmUc = await resultCampaign.usecaseList.reduce(
      async (acc, cur) => {
        const accum = await acc;
        const usecase = campaign.usecaseList.find((item) => item.id === cur.id);

        if (cur.intentList.length) {
          const intents = await cur.intentList.reduce(
            async (accIntent, curIntent) => {
              const accIntentPromise = await accIntent;
              const infoIntent = LIST_INTENT.find(
                (item) => item.id === curIntent.id,
              );
              const count = await messageService.getMsgListByIntent({
                usecaseId: usecase.id,
                intentId: curIntent.id,
                campaignId,
                ssoUserId: user.ssoUserId,
              });
              return [...accIntentPromise, { ...count, ...infoIntent }];
            },
            Promise.resolve([]),
          );
          if (cur.intentList < usecase.intentList) {
            const intentUcNotFinish = usecase.intentList.filter(
              (intentItem) =>
                cur.intentList.findIndex(
                  (item) => item.id === intentItem.id,
                ) === -1,
            );
            const infoIntentUcNotFinish = getIntentsMappingTwoArray(
              intentUcNotFinish,
              LIST_INTENT,
            );
            return [
              ...accum,
              {
                intents: [...intents, ...infoIntentUcNotFinish],
                usecaseId: cur.id,
                usecaseName: usecase.name,
                sumMsg: intents.reduce((sum, item) => {
                  return sum + item.sumMsg;
                }, 0),
                sumMsgConfirm: intents.reduce((sum, item) => {
                  return sum + item.sumMsgConfirm;
                }, 0),
              },
            ];
          }
          return [
            ...accum,
            { intents, usecaseId: cur.id, usecaseName: usecase.name },
          ];
        }
        const infoIntent = getIntentsMappingTwoArray(
          usecase.intentList,
          LIST_INTENT,
        );
        return [
          ...accum,
          {
            usecaseId: cur.id,
            usecaseName: usecase.name,
            intents: infoIntent,
            sumMsg: 0,
            sumMsgConfirm: 0,
          },
        ];
      },
      Promise.resolve([]),
    );
    const usecaseNotFinish = await campaign.usecaseList.reduce((acc, cur) => {
      const indexExist = resultCampaign.usecaseList.findIndex(
        (ucReItem) => ucReItem.id === cur.id,
      );
      if (indexExist === -1) {
        const infoIntent = getIntentsMappingTwoArray(
          cur.intentList,
          LIST_INTENT,
        );
        return [
          ...acc,
          { usecaseName: cur.name, usecaseId: cur.id, intents: infoIntent },
        ];
      }
      return acc;
    }, []);

    result = [...confirmUc, ...usecaseNotFinish];
  }

  if (campaign.collectType === 'intent') {
    const confirmIntents = resultCampaign.intentList.reduce(
      (accIntent, curIntent) => {
        const infoIntent = LIST_INTENT.find((item) => item.id === curIntent.id);

        const count = messageService.getMsgListByIntent({
          intentId: curIntent.id,
          campaignId,
          ssoUserId: user.ssoUserId,
        });
        return [...accIntent, { ...count, ...infoIntent }];
      },
      [],
    );
    const intentsNotFinish = await campaign.intentList.reduce((acc, cur) => {
      const indexExist = resultCampaign.intentList.findIndex(
        (ucReItem) => ucReItem.id === cur.id,
      );
      if (indexExist === -1) {
        const infoIntent = LIST_INTENT.find((item) => item.id === cur.id);
        return [...acc, infoIntent];
      }
      return acc;
    }, []);
    result = [...confirmIntents, ...intentsNotFinish];
  }
  return result;
};

const getStatisticCountUserOverView = async ({ userId }) => {
  const user = await userDao.findUser({ _id: userId });
  if (!user) throw new CustomError(errorCodes.USER_NOT_FOUND);

  const result = await resultDao.getStatisticCountUserOverView({
    userId,
    ssoUserId: user.ssoUserId,
  });
  return result;
};

module.exports = {
  getInfoResult,
  getInfoUsecaseById,
  updateResult,
  getStatisticCountUserByCampaignId,
  getStatisticCountUserOverView,
  getDetailResultUserByCampaignId,
};
