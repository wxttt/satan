const express = require('express');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { AUTH_SECRET } = require('../secret');

const { models } = require('../model');

const auth = require('../middleware/auth');

const { wrapRes } = require('../utils/request');

const router = express.Router();

router.get('/user', async (req, res) => {
  const userList = await models.User.find();

  return res.json(userList);
});

router.get('/user/profile', auth, async (req, res) => {
  res.send(req.user);
});

router.post('/user/register', async (req, res) => {
  const user = await models.User.create({
    username: req.body.username,
    password: req.body.password,
  });

  return res.json(user);
});

router.post('/user/login', async (req, res) => {
  // res.send('login')
  // 1.看用户是否存在
  const user = await models.User.findOne({
    username: req.body.username,
  });
  if (!user) {
    return res.status(422).json({
      message: '用户名不存在',
    });
  }
  // 2.用户如果存在，则看密码是否正确
  const isPasswordValid = bcrypt.compareSync(
    req.body.password,
    user.password,
  );
  if (!isPasswordValid) {
    // 密码无效
    return res.status(422).json({
      message: '密码无效',
    });
  }
  // 生成token
  const token = jwt.sign({
    // eslint-disable-next-line
    id: String(user._id), 
  }, AUTH_SECRET);

  return res.json(wrapRes({
    user: { username: user.username },
    token,
  }));
});

module.exports = router;
