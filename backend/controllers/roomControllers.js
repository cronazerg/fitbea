const Room = require('../models/Room');

exports.getAllRooms = async (req, res, next) => {
  let rooms;
  try {
    [rooms, _] = await Room.findAll();
    res.status(200).json({ count: rooms.length, rooms });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
