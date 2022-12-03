const db = require('../config/db');

class UserHasLesson {
static findAll() {
  let sql = `
        SELECT * FROM user_has_lesson;
    `;
  return db.execute(sql);
  }
}

module.exports = UserHasLesson;