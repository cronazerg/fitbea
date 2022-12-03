const express = require('express');
const lessonControllers = require('../controllers/lessonControllers');
const router = express.Router();

router.route('/')
  .get(lessonControllers.getAllLessons)

module.exports = router;