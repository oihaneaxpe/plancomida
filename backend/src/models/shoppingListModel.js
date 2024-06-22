const db = require('../database');

class ShoppingList {
  static getAllShoppingList(callback) {
    db.query(`SELECT producto as item, CAST(compradoInd AS UNSIGNED) AS checked 
              FROM talistacompra WHERE bajaInd = 0 AND idUsuario = 1;
              `, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);

      callback(null, results);
    });
  }

  static saveShoppingList(shoppingListData, callback) {
    const sql = 'INSERT INTO talistacompra (producto, compradoInd, idUsuario) VALUES (?, ?, 1)';
    
    const promises = shoppingListData.map(itemData => {
      return new Promise((resolve, reject) => {
        console.log("itemData", itemData.checked)
        db.query(sql, [itemData.item, itemData.checked], (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log(result)
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