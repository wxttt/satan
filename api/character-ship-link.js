const express = require('express');

const { models } = require('../model');

const { wrapRes } = require('../utils/request');

const router = express.Router();

router.get('/character-ship-link', async (req, res) => {
  const { params } = req;

  const characterShipLink = await models.CharacterShipLink
    .find(params)
    .populate('ship')
    .populate('origin')
    .populate('dest')
    .exec();

  res.json(wrapRes(characterShipLink));
});

router.post('/character-ship-link', async (req, res, next) => {
  const { body } = req;

  const characterShipLink = new models.CharacterShipLink(body);

  try {
    await characterShipLink.save();

    res.send(req.body);
  } catch (err) {
    next(err);
  }
});

router.delete('/character-ship-link/:id', (req, res, next) => {
  models.CharacterShipLink.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.send('success');
    }
    next(err);
  });
});

router.put('/character-ship-link/:id', (req, res, next) => {
  models.CharacterShipLink.updateOne({ _id: req.params.id }, res.body, (err) => {
    if (!err) {
      res.send('success');
    }
    next(err);
  });
});

module.exports = router;
