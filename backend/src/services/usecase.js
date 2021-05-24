const {
  Types: { ObjectId },
} = require('mongoose');
const campaignDao = require('../daos/campaign');
const messageDao = require('../daos/message');
const resultDao = require('../daos/result');
const userDao = require('../daos/user');
const errorCodes = require('../errors/code');
const CustomError = require('../errors/CustomError');
const {
  LIST_INTENT,
  STATUS_RESULT,
  CAMPAIGN_TYPE,
} = require('../constants/params');

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// lấy từ arr1 những intent không thuộc arr2, mapping arr3
const mappingToGetIntents = (arr1 = [], arr2 = [], arr3 = []) => {
  const questionIntents = arr1.reduce((accIn, curIn) => {
    const intentAssign = arr2.findIndex(
      (intentItem) => intentItem.id === curIn.id,
    );

    if (intentAssign === -1) {
      const intentExist = arr3.find((itemIntent) => itemIntent.id === curIn.id);
      return [
        ...accIn,
        {
          ...intentExist,
          type: 'QUESTION',
        },
      ];
    }
    return accIn;
  }, []);
  return questionIntents;
};

const mappingTwoArray = async ({
  confirmIntents,
  listIntentApi,
  campaignId,
  ssoUserId,
  usecaseId,
}) => {
  const result = [];
  for (let i = 0; i < confirmIntents.length; i += 1) {
    const statisMsg = await messageDao.getMsgListByIntent({
      intentId: confirmIntents[i].id,
      campaignId,
      ssoUserId,
      usecaseId,
    });
    const intentAssign = await listIntentApi.find(
      (intentItem) => intentItem.id === confirmIntents[i].id,
    );
    if (intentAssign) {
      result.push({
        ...intentAssign,
        ...statisMsg,
        ...confirmIntents[i],
        type: 'CONFIRM',
      });
    }
  }

  // const result = await confirmIntents.reduce(async (acc, cur) => {
  //   const statisMsg = await messageDao.getMsgListByIntent({
  //     intentId: cur.id,
  //     campaignId,
  //   });
  //   const intentAssign = await listIntentApi.find(
  //     (intentItem) => intentItem.id === cur.id,
  //   );
  //   if (intentAssign) {
  //     return [
  //       {
  //         ...intentAssign,
  //         ...statisMsg,
  //         ...cur,
  //       },
  //     ];
  //   }
  //   return acc;
  // }, []);
  return result;
};

const findUsecaseNeedChat = async ({
  resultId,
  usecaseByResult,
  usecaseByCampaign,
  usecaseId,
  campaignId,
  ssoUserId,
}) => {
  const processedUc = usecaseByResult.filter(
    (item) => item.status === STATUS_RESULT.PROCESSING,
  );
  // tìm ra kịch bản người dùng cần chat hiện tại là gì
  let currentUc;
  if (processedUc.length) {
    const indexUc = randomRange(0, processedUc.length - 1);
    currentUc = processedUc[indexUc];
  } else {
    const usecaseNotFinish = usecaseByCampaign.reduce((acc, cur) => {
      if (usecaseId === cur.id) return acc;
      const ucExist = usecaseByResult.find(
        (ucReItem) =>
          ucReItem.id === cur.id && ucReItem.status === STATUS_RESULT.FINISH,
      );
      if (!ucExist) {
        return [...acc, cur];
      }
      return acc;
    }, []);
    if (usecaseNotFinish.length) {
      const indexUc = randomRange(0, usecaseNotFinish.length - 1);
      currentUc = usecaseNotFinish[indexUc];
      await resultDao.updateResult(resultId, {
        usecaseList: [
          ...usecaseByResult,
          {
            id: currentUc.id,
            status: STATUS_RESULT.PROCESSING,
            intentList: [],
          },
        ],
      });
    }
    // TODO: nếu đã chat hết rồi thì thông báo chiến dịch hoàn thành
    throw new CustomError(errorCodes.USECASE_FINISH);
  }

  const { id } = currentUc;

  // Tìm ra danh sách ý định đã từng chat
  let confirm = [];
  if (currentUc.intentList) {
    confirm = await mappingTwoArray({
      usecaseId: id,
      confirmIntents: currentUc.intentList,
      listIntentApi: LIST_INTENT,
      campaignId,
      ssoUserId,
    });
  }

  // Tìm danh sách ý định cần chat
  const intentList = processedUc.length ? currentUc.intentList : [];
  const ucExistCampaign = usecaseByCampaign.find((item) => item.id === id);
  const questionIntents = await mappingToGetIntents(
    ucExistCampaign.intentList,
    intentList,
    LIST_INTENT,
  );
  return {
    intentList: [...confirm, ...questionIntents],
    id: ucExistCampaign.id,
    desc: ucExistCampaign.desc,
    name: ucExistCampaign.name,
    type: CAMPAIGN_TYPE.USECASE,
  };
};

const getRenderAutoChatInfo = async ({ campaignId, userId }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }
  // eslint-disable-next-line no-shadow
  const result = await resultDao.findResult({ campaignId, userId });
  if (!result) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  const user = await userDao.findUser({ _id: ObjectId(userId) });
  if (!user) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }

  let infoUsecase;
  if (result.usecaseList.length > 0) {
    infoUsecase = await findUsecaseNeedChat({
      resultId: result._id,
      usecaseByResult: result.usecaseList,
      usecaseByCampaign: campaign.usecaseList,
      campaignId: campaign._id,
      ssoUserId: user.ssoUserId,
    });
  }
  if (campaign.intentList.length) {
    const questionIntents = mappingToGetIntents(
      campaign.intentList,
      result.intentList,
      LIST_INTENT,
    );
    const confirmIntents = result.intentList.filter(
      (item) => item.status === STATUS_RESULT.PROCESSING,
    );
    let statisMsgList = [];

    if (confirmIntents.length) {
      statisMsgList = await mappingTwoArray({
        usecaseId: '',
        confirmIntents,
        listIntentApi: LIST_INTENT,
        campaignId: campaign._id,
        ssoUserId: user.ssoUserId,
      });
    }

    infoUsecase = {
      intentList: [...statisMsgList, ...questionIntents],
      type: CAMPAIGN_TYPE.INTENT,
    };
  }
  return infoUsecase;
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

  const user = await userDao.findUser({ _id: ObjectId(userId) });
  if (!user) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }

  const chatUsecase = result.usecaseList.find(
    (ucItem) => ucItem.id === usecaseId,
  );
  // nếu trong bảng kết quả chưa có thông tin về kịch bản thì thêm
  if (!chatUsecase) {
    await resultDao.updateResult(result._id, {
      usecaseList: [
        ...result.usecaseList,
        { id: usecaseId, status: STATUS_RESULT.PROCESSING, intentList: [] },
      ],
    });
  }

  // Tìm ra danh sách ý định đã từng chat
  const { intentList } = chatUsecase;
  let confirm;
  if (chatUsecase.intentList) {
    confirm = await mappingTwoArray({
      usecaseId: chatUsecase.id,
      confirmIntents: intentList,
      listIntentApi: LIST_INTENT,
      campaignId,
      ssoUserId: user.ssoUserId,
    });
  }
  // Tìm danh sách ý định cần chat
  const usecase = campaign.usecaseList.find((item) => item.id === usecaseId);
  const questionIntents = await mappingToGetIntents(
    usecase.intentList,
    intentList,
    LIST_INTENT,
  );

  const infoUsecase = {
    intentList: [...confirm, ...questionIntents],
    id: usecase.id,
    desc: usecase.desc,
    name: usecase.name,
    type: CAMPAIGN_TYPE.USECASE,
  };

  return infoUsecase;
};

const getListUsecaseNeedChat = async ({ campaignId, userId, usecaseId }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }

  const result = await resultDao.findResult({ campaignId, userId });
  if (!result) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }
  const usecaseNotFinish = campaign.usecaseList.reduce((acc, cur) => {
    if (usecaseId === cur.id) return acc;
    const ucExist = result.usecaseList.find(
      (ucReItem) => ucReItem.status !== STATUS_RESULT.FINISH,
    );

    if (ucExist) {
      return [...acc, cur];
    }
    return acc;
  }, []);
  return usecaseNotFinish;
};

const endUsecase = async ({ campaignId, userId, usecaseId }) => {
  const campaign = await campaignDao.findCampaign(campaignId);
  if (!campaign) {
    throw new CustomError(errorCodes.CAMPAIGN_NOT_FOUND);
  }
  // eslint-disable-next-line no-shadow
  const result = await resultDao.findResult({
    campaignId,
    userId,
    usecaseList: { $elemMatch: { id: usecaseId } },
  });
  if (!result) {
    throw new CustomError(errorCodes.RESULT_NOT_FOUND);
  }

  const user = await userDao.findUser({ _id: ObjectId(userId) });
  if (!user) {
    throw new CustomError(errorCodes.NOT_FOUND);
  }

  const sumIntentByUcCampaign = campaign.usecaseList.find(
    (item) => item.id === usecaseId,
  ).intentList.length;

  const usecaseByResult = result.usecaseList.find(
    (item) => item.id === usecaseId,
  );
  const { intentList } = usecaseByResult;
  const sumIntentByUcFinish = intentList.filter(
    (item) => item.status === STATUS_RESULT.FINISH,
  ).length;
  if (sumIntentByUcFinish !== sumIntentByUcCampaign) {
    throw new CustomError(errorCodes.STATUS_NOT_FINISH);
  } else {
    const infoUsecase = await findUsecaseNeedChat({
      resultId: result.id,
      usecaseByResult: result.usecaseList,
      usecaseByCampaign: campaign.usecaseList,
      usecaseId,
      ssoUserId: user.ssoUserId,
    });

    return infoUsecase;
  }
};

module.exports = {
  getRenderAutoChatInfo,
  getListUsecaseNeedChat,
  endUsecase,
  getInfoUsecaseById,
};
