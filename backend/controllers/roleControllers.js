const Role = require('../models/Role');

exports.getAllRoles = async (req, res, next) => {
  let roles;
  try {
    [roles, _] = await Role.findAll();
    res.status(200).json({ count: roles.length, roles });
  } catch (error) {
    console.log(error);
    next(error);
  }
}