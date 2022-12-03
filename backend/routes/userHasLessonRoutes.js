const express = require('express');
const userHasLessonControllers = require("../controllers/userHasLessonControllers");
const router = express.Router();

router.route('/')
  .get(userHasLessonControllers.getAllUserHasLessons)

module.exports = router;