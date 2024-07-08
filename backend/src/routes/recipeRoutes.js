const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.get('/recipes/all/:id', recipeController.getAllRecipes);
router.get('/recipes/standard', recipeController.getAllStandardRecipes);
router.post('/recipes/:id', recipeController.addRecipe);
router.get('/recipes/:id', recipeController.getRecipeById); 
router.get('/recipes/ingredients/:id', recipeController.getIngredientsForPlan); 

module.exports = router;
