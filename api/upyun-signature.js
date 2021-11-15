const crypto = require('crypto');
const express = require('express');

const { UPYUN_SECRET_KEY } = require('../config');

const { wrapRes } = require('../utils/request');

const router = express.Router();

function MD5(value) {
  return crypto.createHash('md5').update(value).digest('hex');
}
function calSignature(policy) {
  return MD5(`${policy}&${UPYUN_SECRET_KEY}`);
}

function calPolicy(config) {
  return Buffer.from(JSON.stringify(config)).toString('base64');
}

router.get('/upyun-signature', async (req, res) => {
  const { query } = req;
  const policy = calPolicy(query);
  const signature = calSignature(policy);

  res.json(wrapRes({ policy, signature }));
});

module.exports = router;
