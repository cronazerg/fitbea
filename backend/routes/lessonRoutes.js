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

router.route('/:date/:iduser')
  .get(lessonControllers.getLessonsByDate);

router.route('/singIn/:iduser/:idlesson')
  .get(lessonControllers.singOnLesson);

router.route('/singOut/:iduser/:idlesson')
  .delete(lessonControllers.singOffLesson);

module.exports = router;