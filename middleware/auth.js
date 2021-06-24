const jwt = require('jsonwebtoken');

const { models } = require('../model');
const { AUTH_SECRET } = require('../secret');

module.exports = async (req, res, next) => {
  // 获取客户端请求头的token
  try {
    const rawToken = String(req.headers.authorization).split(' ').pop();

    const tokenData = jwt.verify(rawToken, AUTH_SECRET);
    // 获取用户id
    const { id } = tokenData;

    req.user = await models.User.find({ _id: id });

    next();
  } catch (e) {
    console.error(e);
    res.status(404).json({
      message: 'auth failed',
    });
  }
};
