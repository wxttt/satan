const express = require('express');

const { models } = require('../model');

const { wrapRes } = require('../utils/request');

const router = express.Router();

router.get('/character', async (req, res, next) => {
  try {
    const characterList = await models.Character.find(req.query).populate('camp');

    return res.json(wrapRes(characterList));
  } catch (err) {
    return next(err);
  }
});

router.post('/character', async (req, res, next) => {
  const character = new models.Character(req.body);

  try {
    await character.save();
    return res.send(req.body);
  } catch (err) {
    return next(err);
  }
});

router.put('/character/:id', (req, res, next) => {
  models.Character.updateOne({ _id: req.params.id }, req.body, (err) => {
    if (!err) {
      return res.send('success');
    }
    return next(err);
  });
});

router.get('/character/:id', (req, res, next) => {
  models.Character.findById(req.params.id, (err, character) => {
    if (!err) {
      return res.json(character);
    }

    return next(err);
  });
});

router.delete('/character/:id', (req, res, next) => {
  models.Character.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      return res.send('success');
    }
    return next(err);
  });
});

module.exports = router;
