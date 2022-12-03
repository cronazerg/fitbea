const userHasRole = require('../models/userHasRole');

exports.getAllUserHasRoles = async (req, res, next) => {
  let userHasRoles;
  try {
    [userHasRoles, _] = await userHasRole.findAll();
    res.status(200).json({ count: userHasRoles.length, userHasRoles });
  } catch (error) {
    console.log(error);
    next(error);
  }
}