const db = require('../database');
const bcrypt = require('bcrypt');

class User {
  static async registerUser(userData, callback) {
    const { username, email, password } = userData;

    // Generar un hash para la contraseña
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        callback(err, null);
        return;
      }

      const query = `INSERT INTO tmusuario (nombre, email, password) VALUES (?, ?, ?)`;
      db.query(query, [username, email, hashedPassword], (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results);
      });
    });
  } 

  static async findByEmail(email, callback) {
    const query = `SELECT * FROM tmusuario WHERE email = ? AND bajaInd = 0`;
    db.query(query, [email], (err, results) => {
      if (err || results.length === 0) {
        callback(err || new Error('User not found'), null);
        return;
      }
      callback(null, results[0]);
    });
  }
}

module.exports = User;
