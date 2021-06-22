const mongoose = require('mongoose');

// 人物之间的关系
const characterShipLinkSchema = new mongoose.Schema(
  {
    ship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CharacterShip',
      unique: true,
      required: true,
    },
    origin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
      required: true,
    },
    dest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Character',
      required: true,
    },
  },
  { timestamps: true },
);

const CharacterShipLink = mongoose.model('CharacterShipLink', characterShipLinkSchema);

module.exports = CharacterShipLink;
