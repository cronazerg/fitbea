const db = require('../config/db.config');
// const sequelize = require('sequelize');
// const { DataTypes } = require('sequelize');
const UserIdEnum = require('../enums/usersId');

class User {
  constructor( name, last_name, phone, email, password) {
    this.name = name;
    this.last_name = last_name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.created_by = this.name + ' ' + this.last_name;
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
    let sql = `SELECT * FROM user WHERE email = '${email}';`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = `
            SELECT * FROM user
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

  async updateUserRoleById(id) {
    let sql = `UPDATE user SET role = '${this.role}' WHERE iduser = ${id};`;
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
}

module.exports = User;
