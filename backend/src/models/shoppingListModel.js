const db = require('../database');

class ShoppingList {
  static async getAllShoppingList(userId, callback) {
    db.query(`SELECT producto as item, CAST(compradoInd AS UNSIGNED) AS checked 
              FROM talistacompra WHERE bajaInd = 0 AND idUsuario = ?;
              `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static async saveShoppingList(userId, shoppingListData, callback) {
    const sql = 'INSERT INTO talistacompra (producto, compradoInd, idUsuario) VALUES (?, ?, ?)';
    const promises = shoppingListData.map(itemData => {
      return new Promise((resolve, reject) => {
        db.query(sql, [itemData.item, itemData.checked, userId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    });

    Promise.all(promises)
      .then(results => callback(null, results))
      .catch(err => callback(err, null));
  }

  static async deleteShoppingList(userId, callback) {
    db.query(`DELETE FROM talistacompra WHERE bajaInd = 0 AND idUsuario = ?;
    `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
}

module.exports = ShoppingList;