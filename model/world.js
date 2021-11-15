const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: false,
      default: 'https://img.qingchengfit.cn/77cab0ecba74f820e459c3bc9958084f.jpeg',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

const World = mongoose.model('World', schema);

module.exports = World;
