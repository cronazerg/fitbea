const express = require('express');
const roomControllers = require('../controllers/roomControllers');
const router = express.Router();

router.route('/')
  .get(roomControllers.getAllRooms)

module.exports = router;