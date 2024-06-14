const db = require('../database');

class Difficulty {
  static getAllDifficulty(callback) {
    db.query('SELECT * FROM tmdificultad WHERE BajaInd = 0', (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);

      callback(null, results);
    });
  }
}

module.exports = Difficulty;
