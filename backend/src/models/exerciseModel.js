const db = require('../database');

class Exercise {
  static getAllExercise(callback) {
    db.query('SELECT * FROM tmtipoejercicio WHERE bajaInd = 0', (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);

      callback(null, results);
    });
  }

  static getidExerciseByName(exercisename, callback) {
    db.query(`SELECT idtmtipoejercicio as id 
              FROM tmtipoejercicio 
              WHERE bajaInd = 0 AND nombre = ?;`
      , [exercisename], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);

      callback(null, results);
    });
  }
}

module.exports = Exercise;
