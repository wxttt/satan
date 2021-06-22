const express = require('express');

const { models } = require('../model');

const router = express.Router();

router.get('/character', async (req, res) => {
  const characterList = await models.Character.find().populate('camp');

  // const campIdList = characterList.map((item) => item.camp).filter((item) => !!item);

  // const campList = await models.Camp.find({ _id: { $in: campIdList } }).populate('camp');

  // const formattedCharacterList = characterList.map((character) => ({
  //   ...character,
  //   // camp: campIdList.find((item) => item._id === character.camp) || {},
  // }));

  // console.log(characterList.map((item) => ({ ...item })));
  // console.log('campList is', campList);

  res.json(characterList);
});

router.post('/character', async (req, res, next) => {
  const character = new models.Character(req.body);

  try {
    await character.save();
    res.send(req.body);
  } catch (err) {
    next(err);
  }
});

router.put('/character/:id', (req, res) => res.send('update Character'));

router.get('/character/:id', (req, res) => res.send('get Character'));

router.delete('/character/:id', (req, res, next) => {
  models.Character.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.send('success');
    }
    next(err);
  });
});

module.exports = router;
