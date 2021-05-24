const authService = require('../services/auth');

const actionRelativeSso = async (req, res) => {
  const { event, data } = req.body;
  const result = await authService.actionRelativeSso({ event, data });
  return res.send({ status: 1, result });
};

async function verifyToken(req, res) {
  const { user } = req;
  if (req.adminId) {
    return res.send({
      status: 1,
      result: { isAdmin: true, ...user },
    });
  }
  return res.send({ status: 1, result: { ...user } });
}
module.exports = {
  actionRelativeSso,
  verifyToken,
};
