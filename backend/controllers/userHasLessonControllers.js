const UserHasLesson = require('../models/userHasLesson');

exports.getAllUserHasLessons = async (req, res, next) => {
  let userHasLessons;
  try {
    [userHasLessons, _] = await userHasLesson.findAll();
    res.status(200).json({ count: userHasLessons.length, userHasLessons });
  } catch (error) {
    console.log(error);
    next(error);
  }
}