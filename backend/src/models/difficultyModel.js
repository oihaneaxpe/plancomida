const db = require('../database');

class Difficulty {
  static async getAllDifficulty(callback) {
    db.query('SELECT * FROM tmdificultad WHERE BajaInd = 0', (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, results);
    });
  }
}

module.exports = Difficulty;
