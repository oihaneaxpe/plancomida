const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

router.get('/shopping-list', shoppingListController.getAllShoppingList);
router.post('/shopping-list', shoppingListController.saveShoppingList);
router.post('/shopping-list/deleteAll', shoppingListController.deleteShoppingList);

module.exports = router;

