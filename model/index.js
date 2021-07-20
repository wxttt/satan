const mongoose = require('mongoose');

const Character = require('./character');
const CharacterShip = require('./character-ship');
const CharacterShipLink = require('./character-ship-link');
const Camp = require('./camp');
const User = require('./user');
const World = require('./world');

const { DB_PATH } = require('../config');

const dbOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

const connectDb = () => mongoose.connect(DB_PATH, dbOption);

const models = {
  Character,
  Camp,
  CharacterShip,
  CharacterShipLink,
  User,
  World,
};

module.exports = {
  connectDb,
  models,
};
