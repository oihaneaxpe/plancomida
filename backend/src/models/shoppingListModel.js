const db = require('../database');

class ShoppingList {
  static getAllShoppingList(callback) {
    db.query('SELECT producto as item, 0 as checked FROM talistacompra WHERE bajaInd = 0 AND idUsuario = 1;', (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);

      callback(null, results);
    });
  }

  static saveShoppingList(shoppingListData, callback) {
    const sql = 'INSERT INTO talistacompra (producto, idUsuario) VALUES (?, 1)';
    
    const promises = shoppingListData.map(itemData => {
      return new Promise((resolve, reject) => {
        db.query(sql, [itemData.item/*, itemData.checked ? 1 : 0*/], (err, result) => {
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

  static deleteShoppingList(callback) {
    const sql = 'DELETE FROM talistacompra WHERE bajaInd = 0 AND idUsuario = 1;';
    db.query(sql, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
  
}

module.exports = ShoppingList;