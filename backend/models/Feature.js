const db = require('../config/db');

class Feature {
  static findAll() {
    let sql = `
        SELECT * FROM feature;
    `;
    return db.execute(sql);
  }
}

module.exports = Feature;