const mongoose = require('mongoose');

// 人物之间的关系
const characterShipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true },
);

const CharacterShip = mongoose.model('CharacterShip', characterShipSchema);

module.exports = CharacterShip;
