const express = require('express');
const roleControllers = require('../controllers/roleControllers');
const router = express.Router();

router.route('/')
  .get(roleControllers.getAllRoles)

module.exports = router;