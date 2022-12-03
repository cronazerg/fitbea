const Location = require('../models/Location');

exports.getAllLocations = async (req, res, next) => {
  let locations;
  try {
    [locations, _] = await Location.findAll();
    res.status(200).json({ count: locations.length, locations });
  } catch (error) {
    console.log(error);
    next(error);
  }
}