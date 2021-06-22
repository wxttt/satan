const express = require('express');

const { models } = require('../model');

const router = express.Router();

router.get('/camp', async (req, res) => {
  const campList = await models.Camp.find();

  res.json(campList);
});

router.post('/camp', async (req, res) => {
  const camp = new models.Camp(req.body);

  await camp.save();

  res.send(req.body);
});

router.put('/camp/:id', (req, res) => res.send('update camp'));

router.get('/camp/:id', (req, res) => res.send('get camp'));

module.exports = router;
