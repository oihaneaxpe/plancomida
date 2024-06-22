const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

// Ruta para obtener todas las listas de compras
router.get('/shopping-list/:id', shoppingListController.getAllShoppingList);

// Ruta para guardar una lista de compras nueva
router.post('/shopping-list/:id', shoppingListController.saveShoppingList);

// Ruta para eliminar todas las listas de compras
router.get('/shopping-list/deleteAll/:id', shoppingListController.deleteShoppingList);

module.exports = router;
