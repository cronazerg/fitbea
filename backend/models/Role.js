const db = require('../config/db.config');

class Role {
  static findAll() {
    let sql = `
        SELECT * FROM role;
    `;
    return db.execute(sql);
  }
}

module.exports = Role;
