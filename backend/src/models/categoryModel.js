const db = require('../database');

class Category {
  static getAllCategory(callback) {
    db.query('SELECT * FROM tmcategoria WHERE BajaInd = 0', (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log("aa")
      console.log(results);

      callback(null, results);
    });
  }
}

module.exports = Category;
