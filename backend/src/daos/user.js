const {
  Types: { ObjectId },
} = require('mongoose');
const User = require('../models/user');
const { pagination } = require('../constants');

const searchUsers = async (query) => {
  let { page, records } = query;
  const { key, email, status } = query;
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
      name: key,
    };
  }
  if (email) {
    objectQuery = {
      ...objectQuery,
      email,
    };
  }
  if (email) {
    objectQuery = {
      ...objectQuery,
      status,
    };
  }
  const totalRecords = await User.countDocuments(objectQuery);
  const users = await User.find(objectQuery)
    .skip((page - 1) * records)
    .limit(records);

  return {
    totalRecords,
    users,
  };
};

const searchAllByKey = async (query) => {
  const { key } = query;
  const users = await User.find({ email: new RegExp(key, 'gi') }).lean();
  return users;
};

const createUser = async ({ email, name, password, birthday, gender }) => {
  const user = await User.create({ email, name, password, birthday, gender });
  return user;
};

const createClientUser = async (user) => {
  const clientUser = await User.create(user);
  return clientUser;
};

const findAllUser = async () => {
  const users = await User.find().lean();
  return users;
};
const findUser = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const user = await User.findById(condition).lean();
    return user;
  }

  if (typeof condition === 'object' && condition !== null) {
    const user = await User.findOne(condition).lean();
    return user;
  }

  return null;
};

const updateUser = async (userId, data) => {
  const user = await User.findByIdAndUpdate(userId, data, { new: false });
  return user;
};

const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};

module.exports = {
  searchUsers,
  createUser,
  findUser,
  updateUser,
  deleteUser,
  findAllUser,
  createClientUser,
  searchAllByKey,
};
