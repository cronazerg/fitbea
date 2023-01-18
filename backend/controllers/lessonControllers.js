const Lesson = require('../models/Lesson');
const moment = require('moment');
const User = require("../models/User");

exports.getAllLessons = async (req, res, next) => {
  let lessons;
  try {
    [lessons, _] = await Lesson.findAll();
    res.status(200).json({count: lessons.length, lessons});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.createLesson = async (req, res, next) => {
  let newLesson = {}

  const {date, start_time, end_time, title, description, room_idroom, iduser} = req.body;
  const lesson = new Lesson(date, start_time, end_time, title, description, room_idroom);

  try {
    await lesson.save();
  } catch (error) {
    console.log(error);
    next(error);
  }

  try {
    let [lesson, _] = await Lesson.findLastCreatedLesson();
    newLesson = lesson[0];

  } catch (error) {
    console.log(error);
    next(error);
  }

  try {
    let [_] = await Lesson.saveTrainerToLesson(newLesson.idlesson, iduser);
    res.status(201).json({message: 'Lesson created', lesson});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.getAllRooms = async (req, res, next) => {
  let rooms;
  try {
    [rooms, _] = await Lesson.getAllRooms();
    res.status(200).json({
      count: rooms
        .length, rooms
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.getAllTrainers = async (req, res, next) => {
  let trainers;
  try {
    [trainers, _] = await Lesson.getAllTrainers();
    res.status(200).json({count: trainers.length, trainers});
  } catch (error) {
    console.log(error);
    next(error);
  }
}