const db = require('../database');

class User {
  static registerUser(userData, callback) {
    const { username, email, password } = userData;
    const query = `INSERT INTO tmusuario (nombre, email, password) VALUES (?, ?, ?)`;
    db.query(query, [username, email, password], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  } 
}

module.exports = User;
