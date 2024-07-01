const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes', recipeController.getAllStandardRecipes);
router.post('/recipes/:id', recipeController.addRecipe);
router.get('/recipes/:id', recipeController.getRecipeById); 
router.get('/recipes/ingredients/:id', recipeController.getIngredientsForPlan); 

module.exports = router;
