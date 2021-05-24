const campaignDao = require('../../daos/campaign');

const overview = async () => {
  const totalCampaign = await (await campaignDao.findAllCampaign()).length;
  const totalUpcomingCampaign = await (
    await campaignDao.findAllCampaign()
  ).filter((campaign) => campaign.status === 'waiting').length;
  const totalHappeningCampaign = await (
    await campaignDao.findAllCampaign()
  ).filter(
    (campaign) => campaign.status === 'running' || campaign.status === 'pause',
  ).length;
  const totalTextCampaign = await (await campaignDao.findAllCampaign()).filter(
    (campaign) => campaign.messageType === 'msg_text',
  ).length;
  const totalVoiceCampaign = await (await campaignDao.findAllCampaign()).filter(
    (campaign) => campaign.messageType === 'msg_voice',
  ).length;
  const totalUsecaseCampaign = await (
    await campaignDao.findAllCampaign()
  ).filter((campaign) => campaign.collectType === 'usecase').length;
  const totalIntentCampaign = await (
    await campaignDao.findAllCampaign()
  ).filter((campaign) => campaign.collectType === 'intent').length;
  const totalTopicCampaign = await (await campaignDao.findAllCampaign()).filter(
    (campaign) => campaign.collectType === 'topic',
  ).length;
  const totalFreeCampaign = await (await campaignDao.findAllCampaign()).filter(
    (campaign) => campaign.collectType === 'free',
  ).length;
  const result = [
    { title: 'totalCampaign', number: totalCampaign },
    { title: 'totalUpcomingCampaign', number: totalUpcomingCampaign },
    { title: 'totalHappeningCampaign', number: totalHappeningCampaign },
    { title: 'totalTextCampaign', number: totalTextCampaign },
    { title: 'totalVoiceCampaign', number: totalVoiceCampaign },
    { title: 'totalUsecaseCampaign', number: totalUsecaseCampaign },
    { title: 'totalIntentCampaign', number: totalIntentCampaign },
    { title: 'totalTopicCampaign', number: totalTopicCampaign },
    { title: 'totalFreeCampaign', number: totalFreeCampaign },
  ];
  return result;
};

module.exports = {
  overview,
};
