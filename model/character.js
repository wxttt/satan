const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: false,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    world: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'World',
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: 'https://img.qingchengfit.cn/77cab0ecba74f820e459c3bc9958084f.jpeg',
    },
    camp: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Camp',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true },
);

const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
