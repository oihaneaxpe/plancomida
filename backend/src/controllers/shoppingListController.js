const ShoppingList = require('../models/shoppingListModel');

exports.getAllShoppingList = (req, res) => {
  const userId = req.params.id;
  ShoppingList.getAllShoppingList(userId, (err, shoppingList) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching shopping list' });
      return;
    }
    res.json(shoppingList);
  });
};

exports.deleteShoppingList = (req, res) => {
  const userId = req.params.id;
  ShoppingList.deleteShoppingList(userId, (err, result) => {
    if (err) {
      console.error('Error deleting shopping list:', err);
      res.status(500).json({ error: 'Error removing shopping list' });
      return;
    }

    res.json({ message: 'Shopping list deleted successfully', affectedRows: result.affectedRows });
  });
};

exports.saveShoppingList = (req, res) => {
  const userId = req.params.id;
  const shoppingListData = req.body;
  ShoppingList.saveShoppingList(userId, shoppingListData, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding shopping list' });
      return;
    }
    res.json({ message: 'Shopping list added successfully', id: result.insertId });
  });
};