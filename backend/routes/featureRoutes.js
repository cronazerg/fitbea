const express = require('express');
const featureControllers = require('../controllers/featureControllers');
const router = express.Router();

router.route('/')
  .get(featureControllers.getAllFeatures)

module.exports = router;