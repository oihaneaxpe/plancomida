const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getAllRecipes);
router.post('/recipes', recipeController.addRecipe);
router.get('/recipes/:id', recipeController.getRecipeById); // Nueva ruta para obtener una receta por id

module.exports = router;
