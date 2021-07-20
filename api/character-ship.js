const express = require('express');

const { models } = require('../model');

const { wrapRes } = require('../utils/request');

const router = express.Router();

router.get('/character-ship', async (req, res, next) => {
  try {
    const characterShipList = await models.CharacterShip.find(req.query);

    return res.json(wrapRes(characterShipList));
  } catch (e) {
    return next(e);
  }
});

router.post('/character-ship', async (req, res, next) => {
  try {
    const characterShip = new models.CharacterShip(req.body);

    await characterShip.save();

    return res.send(req.body);
  } catch (e) {
    return next(e);
  }
});

router.delete('/character-ship/:id', (req, res, next) => {
  models.CharacterShip.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      return res.send('success');
    }
    return next(err);
  });
});

router.put('/character-ship/:id', (req, res, next) => {
  models.CharacterShip.updateOne({ _id: req.params.id }, res.body, (err) => {
    if (!err) {
      return res.send('success');
    }

    return next(err);
  });
});

router.get('/character-ship/:id', (req, res, next) => {
  models.CharacterShip.findById(req.params.id, (err, characterShip) => {
    if (!err) {
      return res.send(characterShip);
    }

    return next(err);
  });
});

module.exports = router;
