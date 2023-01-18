const express = require('express');
const lessonControllers = require('../controllers/lessonControllers');
const router = express.Router();

router.route('/')
  .get(lessonControllers.getAllLessons)
  .post(lessonControllers.createLesson);

router.route('/rooms')
  .get(lessonControllers.getAllRooms);

router.route('/trainers')
  .get(lessonControllers.getAllTrainers);

module.exports = router;