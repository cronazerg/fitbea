const express = require('express');
const userHasRoleControllers = require('../controllers/userHasRoleControllers');
const router = express.Router();

router.route('/')
  .get(userHasRoleControllers.getAllUserHasRoles)

module.exports = router;