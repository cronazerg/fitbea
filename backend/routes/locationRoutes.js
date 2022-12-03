const express = require('express');
const locationControllers = require('../controllers/locationControllers');
const router = express.Router();

router.route('/')
  .get(locationControllers.getAllLocations)

module.exports = router;