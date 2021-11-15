const express = require('express');

const { models } = require('../model');

const { wrapRes } = require('../utils/request');

const auth = require('../middleware/auth');
const worldPermission = require('../middleware/world_permission');

const router = express.Router();

router.get('/camp', auth, worldPermission, async (req, res, next) => {
  try {
    const campList = await models.Camp
      .find(req.query)
      .populate('world');

    res.json(wrapRes(campList));
  } catch (e) {
    next(e);
  }
});

router.post('/camp', auth, worldPermission, async (req, res, next) => {
  try {
    const camp = new models.Camp(req.body);

    await camp.save();

    res.send(req.body);
  } catch (e) {
    next(e);
  }
});

router.delete('/camp/:id', auth, worldPermission, async (req, res, next) => {
  try {
    await models.Camp.deleteOne({ _id: req.params.id });
    res.json(wrapRes({}));
  } catch (err) {
    next(err);
  }
});

router.put('/camp/:id', auth, worldPermission, async (req, res, next) => {
  try {
    await models.Camp.updateOne({ _id: req.params.id }, req.body);
    res.json(wrapRes({}));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
