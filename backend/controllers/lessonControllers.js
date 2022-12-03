const Lesson = require('../models/Lesson');

exports.getAllLessons = async (req, res, next) => {
  let lessons;
  try {
    [lessons, _] = await Lesson.findAll();
    res.status(200).json({ count: lessons.length, lessons });
  } catch (error) {
    console.log(error);
    next(error);
  }
}