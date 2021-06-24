const express = require('express');

const { models } = require('../model');

const router = express.Router();

router.get('/character-ship-link', async (req, res) => {
  const { params } = req;

  console.log('params is', params);
  const characterShipLink = await models.CharacterShipLink
    .find(params)
    .populate('ship')
    .populate('origin')
    .populate('dest')
    .exec();

  res.json(characterShipLink);
});

router.post('/character-ship-link', async (req, res) => {
  const { body } = req;

  const characterShipLink = new models.CharacterShipLink(body);

  await characterShipLink.save();

  res.send(req.body);
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
