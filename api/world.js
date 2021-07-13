const express = require('express');

const auth = require('../middleware/auth');

const { models } = require('../model');

const { wrapRes } = require('../utils/request');

const router = express.Router();

router.get('/world', async (req, res) => {
  const worldList = await models.World.find();

  res.json(wrapRes(worldList));
});

router.post('/world', auth, async (req, res, next) => {
  const { body, user: { _id: userId } } = req;

  const world = new models.World({
    name: body.name,
    logo: body.logo,
    createdBy: userId,
    description: body.description,
  });

  try {
    await world.save();
    return res.send(req.body);
  } catch (err) {
    return next(err);
  }
});

router.put('/world/:id', (req, res, next) => {
  models.World.updateOne({ _id: req.params.id }, req.body, (err) => {
    if (!err) {
      return res.send('success');
    }
    return next(err);
  });
});

router.get('/world/:id', (req, res, next) => {
  models.World.findById(req.params.id, (err, world) => {
    if (!err) {
      return res.json(world);
    }

    return next(err);
  });
});

router.delete('/world/:id', (req, res, next) => {
  models.World.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      return res.send('success');
    }
    return next(err);
  });
});

module.exports = router;
