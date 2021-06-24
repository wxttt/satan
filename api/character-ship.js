const express = require('express');

const { models } = require('../model');

const router = express.Router();

router.get('/character-ship', async (req, res) => {
  const characterShipList = await models.CharacterShip.find();

  return res.json(characterShipList);
});

router.post('/character-ship', async (req, res) => {
  const characterShip = new models.CharacterShip(req.body);

  await characterShip.save();

  return res.send(req.body);
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
