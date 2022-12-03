const db = require('../config/db');

class Lesson {
  static findAll() {
    let sql = `
        SELECT * FROM lesson;
    `;
    return db.execute(sql);
  }
}

module.exports = Lesson;
