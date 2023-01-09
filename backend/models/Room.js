const db = require('../config/db.config');

class Room {
  static findAll() {
    let sql = `
        SELECT * FROM room;
    `;
    return db.execute(sql);
  }
}

module.exports = Room;
