const db = require('../config/db');

class Zone {
  static findAll() {
    let sql = `
        SELECT * FROM zone;
    `;
    return db.execute(sql);
  }
}

module.exports = Zone;
