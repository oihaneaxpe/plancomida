const db = require('../database');

class ShoppingList {
  static getAllShoppingList(callback) {
    db.query('SELECT producto as item, 0 as checked FROM talistacompra WHERE bajaInd = 0;', (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);

      callback(null, results);
    });
  }

  static saveShoppingList(shoppingListData, callback) {
    const sql = 'INSERT INTO talistacompra (producto) VALUES (?)';
    
    const promises = shoppingListData.map(itemData => {
      return new Promise((resolve, reject) => {
        console.log(itemData)
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

  static deleteShoppingList2(callback) {
    console.log(2)
    db.query('DELETE FROM talistacompra WHERE bajaInd = 0 AND idUsuario IS NULL;', (err, results) => {
      console.log(err, results)
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);

      callback(null, results);
    });
  }

  static deleteShoppingList3(callback) {
 
    // Verifica que la conexión a la base de datos está establecida
    if (!db) {
      console.error('No database connection.');
      callback(new Error('No database connection.'), null);
      return;
    }
  
    // Ejecuta la consulta DELETE
    db.query('DELETE FROM talistacompra WHERE bajaInd = 0 AND idUsuario IS NULL;', (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        callback(err, null);
        return;
      }
  
      console.log('Delete query results:', results);
      callback(null, results);
    });
  }
  
  static deleteShoppingList(callback) {
    const sql = 'DELETE FROM talistacompra WHERE bajaInd = 0 AND idUsuario IS NULL;';
  
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