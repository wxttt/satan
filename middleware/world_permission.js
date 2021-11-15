const { models } = require('../model');

module.exports = async (req, res, next) => {
  if (!req.params.id && !req.query.world) {
    next();
  } else {
    try {
      const wordId = req.query.world || req.params.id;
      const world = await models.World.findOne({ _id: wordId });
      // eslint-disable-next-line no-underscore-dangle
      if (!!world && world.createdBy.toString() === req.user._id.toString()) {
        next();
      } else {
        // throw new Error('no permission');
        return res.status(403).json({
          message: 'no permission',
        });
      }
    } catch (e) {
      res.status(403).json({
        message: 'no permission',
      });
    }
  }
};
