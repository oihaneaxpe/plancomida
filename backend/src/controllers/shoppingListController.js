const ShoppingList = require('../models/shoppingListModel');

exports.getAllShoppingList = (req, res) => {
  const userId = req.params.id;
  ShoppingList.getAllShoppingList(userId, (err, shoppingList) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo la lista de la compra' });
      return;
    }
    res.json(shoppingList);
  });
};

exports.deleteShoppingList = (req, res) => {
  const userId = req.params.id;
  ShoppingList.deleteShoppingList(userId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error eliminando la lista de la compra' });
      return;
    }

    res.json({ message: 'Lista de la compra eliminado con éxito', affectedRows: result.affectedRows });
  });
};

exports.saveShoppingList = (req, res) => {
  const userId = req.params.id;
  const shoppingListData = req.body;
  ShoppingList.saveShoppingList(userId, shoppingListData, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error añadiendo la lista de la compra' });
      return;
    }
    res.json({ message: 'Lista de la compra añadido con éxito', id: result.insertId });
  });
};