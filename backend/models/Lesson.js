const db = require('../config/db.config');

class Lesson {
  constructor(date, start_time, end_time, title, description, room_idroom) {
    this.date = date;
    this.start_time = start_time;
    this.end_time = end_time;
    this.title = title;
    this.description = description;
    this.room_idroom = room_idroom;
  }

  save() {
    let sql = `
      INSERT INTO lesson (
        date, 
        start_time,
        end_time,
        title, 
        description,
        room_idroom
      ) VALUES (
        '${this.date}',
        '${this.start_time}',
        '${this.end_time}',
        '${this.title}',
        '${this.description}',
        '${this.room_idroom}'
      )
  `;

    console.log(sql)
    return db.execute(sql);
  }

  static async findLastCreatedLesson() {
    let sql = `
        SELECT * FROM lesson ORDER BY idlesson DESC LIMIT 1;
    `;
    return db.execute(sql);
  }

  static findAll() {
    let sql = `
        SELECT * FROM lesson;
    `;
    return db.execute(sql);
  }

  static async getAllRooms() {
    let sql = `
        SELECT room.*, zone.description, location.city, location.adress, location.idlocation 
        FROM room
        LEFT JOIN zone ON room.zone_idzone = zone.idzone
        LEFT JOIN location ON zone.location_idlocation = location.idlocation;
    `;
    return db.execute(sql);
  }

  static async getAllTrainers() {
    let sql = `
        SELECT name, last_name, iduser, user_has_role.role_idrole 
        FROM user
        LEFT JOIN user_has_role ON user.iduser = user_has_role.user_iduser
        WHERE user_has_role.role_idrole = 2;
    `;
    return db.execute(sql);
  }

  static async saveTrainerToLesson(idlesson, idtrainer) {
    let sql = `
        INSERT INTO trainer_has_lesson (
          lesson_idlesson,
          user_iduser
        ) VALUES (
          ${idlesson},
          ${idtrainer}
        )
    `;
    return db.execute(sql);
  }
}

module.exports = Lesson;

