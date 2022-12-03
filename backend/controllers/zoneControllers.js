const Zone = require('../models/Zone');

exports.getAllZones = async (req, res, next) => {
  let zones;
  try {
    [zones, _] = await Zone.findAll();
    res.status(200).json({ count: zones.length, zones });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
