const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getAllRecipes);
router.post('/recipes', recipeController.addRecipe);
router.get('/recipes/:id', recipeController.getRecipeById); // Obtener una receta por id
router.get('/recipes/ingredients/:id', recipeController.getIngredientsForPlan); // Obtener ingredientes de la planificacion

module.exports = router;
