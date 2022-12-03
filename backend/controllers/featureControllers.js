const Feature = require('../models/Feature');

exports.getAllFeatures = async (req, res, next) => {
  let features;
  try {
    [features, _] = await Feature.findAll();
    res.status(200).json({ count: features.length, features });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
