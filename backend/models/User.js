const db = require('../config/db.config');
// const sequelize = require('sequelize');
// const { DataTypes } = require('sequelize');
const UserIdEnum = require('../enums/usersId');

class User {
  constructor(name, last_name, phone, email, password, edit_by) {
    this.name = name;
    this.last_name = last_name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.created_by = this.name + ' ' + this.last_name;
    this.edit_by = edit_by;
  }

  save() {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let date = `${yyyy}-${mm}-${dd}`;

    let sql = `
      INSERT INTO user (
        name, 
        last_name, 
        phone,
        email,
        created_at,
        password,
        created_by
      ) VALUES (
        '${this.name}',
        '${this.last_name}',
        '${this.phone}',
        '${this.email}',
        '${date}',
        '${this.password}',
        '${this.created_by}'
      )
  `;

    return db.execute(sql);
  }

  static setUserHasRole(id) {
    let d = new Date();
    let yyyy = d.getFullYear();
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    let date = `${yyyy}-${mm}-${dd}`;

    let sql = `
      INSERT INTO user_has_role (
        user_iduser, 
        role_idrole, 
        change_date, 
        edit_by
      ) VALUES (
        ${id}, 
        ${UserIdEnum.member},
        '${date}', 
        ${id}
      )
    `;

    return db.execute(sql);
  }

  static findUserIdByEmail(email) {
    let sql = `SELECT iduser FROM user WHERE email = '${email}';`;
    return db.execute(sql);
  }

  static findByEmail(email) {
    let sql = `SELECT user.*, user_has_role.role_idrole FROM user
              LEFT JOIN user_has_role ON user.iduser = user_has_role.user_iduser
              WHERE user.email = '${email}';
    `;
    return db.execute(sql);
  }

  static findAll() {
    let sql = `
            SELECT * FROM allusers;
        `;

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM user WHERE iduser = ${id};`;
    return db.execute(sql);
  }

  static deleteById(id) {
    let sql = `DELETE FROM user WHERE iduser = ${id};`;
    return db.execute(sql);
  }

  static deleteByIdRole(id) {
    let sql = `DELETE FROM user_has_role WHERE user_iduser = ${id};`;
    return db.execute(sql);
  }

  async updateUserPassById(id) {
    let sql = `UPDATE user SET password = '${this.password}' WHERE iduser = ${id};`;
    return db.execute(sql);
  }

  async updateUserEmailById(id) {
    let sql = `UPDATE user SET email = '${this.email}' WHERE iduser = ${id};`;
    return db.execute(sql);
  }

  async updateUserPhoneById(id) {
    let sql = `UPDATE user SET phone = '${this.phone}' WHERE iduser = ${id};`;
    return db.execute(sql);
  }

  async updateUserDataById(id, edit_by) {
    let sql = `
        UPDATE user SET
            name = '${this.name}',
            last_name = '${this.last_name}',
            phone = '${this.phone}',
            email = '${this.email}',
            edit_date = NOW(),
            edit_by = '${edit_by}'
        WHERE iduser = ${id};
    `;
    return db.execute(sql);
  }

  static updateUserHasRole(id, edit_by, role_idrole) {
    let sql = `
        UPDATE user_has_role SET
            role_idrole = ${role_idrole},
            edit_by = '${edit_by}'
        WHERE user_iduser = ${id};
    `;
    return db.execute(sql);
  }
}

module.exports = User;
