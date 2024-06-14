const ShoppingList = require('../models/shoppingListModel');

exports.getAllShoppingList = (req, res) => {
  ShoppingList.getAllShoppingList((err, shoppingList) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching shopping list' });
      return;
    }
    console.log("shoppingList",shoppingList);
    res.json(shoppingList);
  });
};

exports.deleteShoppingList = (req, res) => {
  ShoppingList.deleteShoppingList((err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error removing shopping list' });
      return;
    }
    res.json({ message: 'Shopping list deleted successfully', affectedRows: result.affectedRows });
  });
};

exports.saveShoppingList = (req, res) => {
  const shoppingListData = req.body;
  ShoppingList.saveShoppingList(shoppingListData, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error adding shopping list' });
      return;
    }
    res.json({ message: 'Shopping list added successfully', id: result.insertId });
  });
};