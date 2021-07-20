const mongoose = require('mongoose');

const campSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    world: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'World',
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
  },
  { timestamps: true },
);

const Camp = mongoose.model('Camp', campSchema);

module.exports = Camp;
