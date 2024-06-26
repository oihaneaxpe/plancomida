const db = require('../database');
const bcrypt = require('bcrypt');

class User {
  static registerUser(userData, callback) {
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

    // const query = `INSERT INTO tmusuario (nombre, email, password) VALUES (?, ?, ?)`;
    // db.query(query, [username, email, password], (err, results) => {
    //   if (err) {
    //     callback(err, null);
    //     return;
    //   }
    //   callback(null, results);
    // });
  } 

  static findByEmail(email, callback) {
    const query = `SELECT * FROM tmusuario WHERE email = ? AND bajaInd = 0`;
    db.query(query, [email], (err, results) => {
      console.log(err, results)
      if (err || results.length === 0) {
        callback(err || new Error('User not found'), null);
        return;
      }
      console.log(results)
      callback(null, results[0]);
    });
  }
}

module.exports = User;
