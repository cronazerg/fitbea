const db = require('../config/db');

class UserHasRole {
  static findAll() {
    let sql = `
        SELECT * FROM user_has_role;
    `;
    return db.execute(sql);
  }
}

module.exports = UserHasRole;
