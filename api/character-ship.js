const express = require('express');

const { models } = require('../model');

const router = express.Router();

router.get('/character-ship', async (req, res) => {
  const characterShipList = await models.CharacterShip.find();

  res.json(characterShipList);
});

router.post('/character-ship', async (req, res) => {
  const characterShip = new models.CharacterShip(req.body);

  await characterShip.save();

  res.send(req.body);
});

router.delete('/character-ship/:id', (req, res, next) => {
  models.CharacterShip.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.send('success');
    }
    next(err);
  });
});

router.put('/character-ship/:id', (req, res) => res.send('update Character ship'));

router.get('/character-ship/:id', (req, res) => res.send('get single Character ship'));

module.exports = router;
