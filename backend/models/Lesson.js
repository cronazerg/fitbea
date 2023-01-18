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

  static async getLessonsByDate(date, iduser) {
    let sql = `
        SELECT lesson.*, room.room_number, room.size, trainer_has_lesson.user_iduser, user.name, user.last_name, room.zone_idzone as 'idzone', zone.location_idlocation as 'idlocation',
        CASE
          WHEN user_has_lesson.user_iduser IS NOT NULL THEN count(iduser) 
            ELSE 0 
        END as 'userCount',
        CASE
        WHEN ${iduser} = user_has_lesson.user_iduser THEN true
            ELSE false
        END as 'alreadyOnLesson'
        FROM lesson
        LEFT JOIN room ON lesson.room_idroom = room.idroom
        LEFT JOIN trainer_has_lesson ON lesson.idlesson = trainer_has_lesson.lesson_idlesson
        LEFT JOIN user_has_lesson ON lesson.idlesson = user_has_lesson.lesson_idlesson
        LEFT JOIN user ON trainer_has_lesson.user_iduser = user.iduser
        LEFT JOIN zone ON room.zone_idzone = zone.idzone
        WHERE date >= ${date} AND date <= date_add(${date}, interval 5 day)
        GROUP BY lesson.idlesson;
    `;
    return db.execute(sql)
  }

  static async saveUserToLesson(idlesson, iduser) {
    let sql = `
        INSERT INTO user_has_lesson (
          user_iduser,
          lesson_idlesson
        ) VALUES (
          ${iduser},
          ${idlesson}
        )
    `;
    return db.execute(sql);
  }

  static async findLessonById(idlesson) {
    let sql = `
        SELECT * FROM lesson WHERE idlesson = ${idlesson};
    `;
    return db.execute(sql);
  }

  static async deleteUserFromLesson(idlesson, iduser) {
    let sql = `
        DELETE FROM user_has_lesson WHERE user_iduser = ${iduser} AND lesson_idlesson = ${idlesson};
    `;
    return db.execute(sql);
  }
}

module.exports = Lesson;

