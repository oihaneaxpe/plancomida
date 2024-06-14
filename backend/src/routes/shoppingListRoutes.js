const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

// Ruta para obtener todas las listas de compras
router.get('/shopping-list', shoppingListController.getAllShoppingList);

// Ruta para guardar una lista de compras nueva
router.post('/shopping-list', shoppingListController.saveShoppingList);

// Ruta para eliminar todas las listas de compras
router.get('/shopping-list/deleteAll', shoppingListController.deleteShoppingList);

module.exports = router;
