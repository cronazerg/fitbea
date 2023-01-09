const db = require('../config/db.config');

class Location {
  static findAll() {
    let sql = `
        SELECT * FROM feature;
    `;
    return db.execute(sql);
  }
}

module.exports = Location;
