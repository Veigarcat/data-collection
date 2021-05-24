const pagination = {
  pageNumber: 1,
  recordNumber: 6,
};
const regExp = {
  REG_EXP_EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  REG_EXP_PASSWORD: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9@$!%*#?&]{8,}$/,
};

module.exports = {
  pagination,
  A_WEEK: 7 * 86400 * 1000,
  regExp,
};
