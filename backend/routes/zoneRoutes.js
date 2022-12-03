const express = require('express');
const zoneControllers = require('../controllers/zoneControllers');
const router = express.Router();

router.route('/')
  .get(zoneControllers.getAllZones)

module.exports = router;