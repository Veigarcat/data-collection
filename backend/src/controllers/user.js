const userService = require('../services/user');

const searchUsers = async (req, res) => {
  const { query } = req;
  const result = await userService.searchUsers(query);
  return res.send({ status: 1, result });
};

const searchAllByKey = async (req, res) => {
  const { query } = req;
  const result = await userService.searchAllByKey(query);
  return res.send({ status: 1, result });
};
const editUser = async (req, res) => {
  const { data } = req.body;
  const { user, accessToken } = req;
  const userId = user._id;
  const result = await userService.editUser({ accessToken, userId, data });
  return res.send({ status: 1, result });
};
const getUser = async (req, res) => {
  const { condition } = req.query;
  const user = await userService.getUser(condition);
  return res.send({ status: 1, user });
};
const getAllUser = async (req, res) => {
  const users = await userService.getAllUser();
  return res.send({ status: 1, result: users });
};

const userJoinCampaign = async (req, res) => {
  const { userId, campaignId } = req.body;

  const result = await userService.userJoinCampaign({
    userId,
    campaignId,
  });
  return res.send({ status: 1, result });
};

const userLeaveCampaign = async (req, res) => {
  const { userId, campaignId } = req.body;

  const result = await userService.userLeaveCampaign({ userId, campaignId });
  return res.send({ status: 1, result });
};

const userAcceptInvite = async (req, res) => {
  const { userId, campaignId } = req.body;

  const result = await userService.handleAcceptInvite({
    userId,
    campaignId,
  });
  return res.send({ status: 1, result });
};

module.exports = {
  searchUsers,
  getUser,
  userJoinCampaign,
  userLeaveCampaign,
  userAcceptInvite,
  searchAllByKey,
  getAllUser,
  editUser,
};
