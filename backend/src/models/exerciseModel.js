const db = require('../database');

class Exercise {
  static async getAllExercise(callback) {
    db.query(`SELECT * FROM tmtipoejercicio WHERE bajaInd = 0;`, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, results);
    });
  }

  static async getidExerciseByName(exercisename, callback) {
    db.query(`SELECT idtmtipoejercicio as id 
              FROM tmtipoejercicio 
              WHERE bajaInd = 0 AND nombre = ?;`
      , [exercisename], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, results);
    });
  }
}

module.exports = Exercise;
