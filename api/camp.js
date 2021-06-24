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

router.delete('/camp/:id', (req, res, next) => {
  models.Camp.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.send('success');
    }
    next(err);
  });
});

router.put('/camp/:id', (req, res, next) => {
  models.Camp.updateOne({ _id: req.params.id }, req.body, (err) => {
    if (!err) {
      res.send('success');
    }
    next(err);
  });
});

// router.get('/camp/:id', (req, res) => {

// });

module.exports = router;
