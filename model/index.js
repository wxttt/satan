const mongoose = require('mongoose');

const Character = require('./character');
const CharacterShip = require('./character-ship');
const CharacterShipLink = require('./character-ship-link');
const Camp = require('./camp');
const User = require('./user');

const dbPath = 'mongodb://localhost:27017/test';
const dbOption = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true };

const connectDb = () => mongoose.connect(dbPath, dbOption);

const models = {
  Character,
  Camp,
  CharacterShip,
  CharacterShipLink,
  User,
};

module.exports = {
  connectDb,
  models,
};
