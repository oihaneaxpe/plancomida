const Recipe = require('../models/recipeModel');

exports.getAllStandardRecipes = (req, res) => {
  Recipe.getAllStandardRecipes((err, recipes) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching standard recipes' });
      return;
    }
    res.json(recipes);
  });
};

exports.getAllRecipes = (req, res) => {
  const userId = req.params.id;
  let allRecipes = [];

  // Obtener todas las recetas estándar
  Recipe.getAllStandardRecipes((err, standardRecipes) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching recipes' });
      return;
    }
    
    // Agregar las recetas estándar al array allRecipes
    allRecipes = allRecipes.concat(standardRecipes);

    // Obtener las recetas por usuario
    Recipe.getAllRecipesByUserId(userId, (err, userRecipes) => {
      if (err) {
        res.status(500).json({ error: 'Error fetching user recipes' });
        return;
      }
      
      // Agregar las recetas por usuario al array allRecipes
      allRecipes = allRecipes.concat(userRecipes);

      res.json(allRecipes);
    });
  });
};

exports.getRecipeById = (req, res) => {
  const recipeId = req.params.id;
  // Step 1: Get the recipe generic information
  Recipe.getRecipeById(recipeId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving recipe detail' });
      return;
    }

    res.json(result);
  });
};

exports.addRecipe = (req, res) => {
  const userId = req.params.id;
  const recipeData = req.body;

  // Step 1: Add the recipe
  Recipe.addRecipe(userId, recipeData, (err, recipeResult) => {
    if (err) {
      console.error('Error adding recipe:', err);
      res.status(500).json({ error: 'Error adding recipe' });
      return;
    }

    const recipeId = recipeResult.insertId;
    const ingredients = recipeData.ingredients;
    const steps = recipeData.steps;

    // Step 2: Add ingredients for the recipe
    Recipe.addIngredients(recipeId, ingredients, (err, ingredientsResult) => {
      if (err) {
        console.error('Error adding ingredients:', err);
        res.status(500).json({ error: 'Error adding ingredients' });
        return;
      }

      // Step 3: Add steps for the recipe
      Recipe.addSteps(recipeId, steps, (err, stepsResult) => {
        if (err) {
          console.error('Error adding steps:', err);
          res.status(500).json({ error: 'Error adding steps' });
          return;
        }

        // If recipe, ingredients, and steps were added successfully
        res.json({ message: 'Recipe, ingredients, and steps added successfully' });
      });
    });
  });
};

exports.getIngredientsForPlan = (req, res) => {
  const userId = req.params.id;
  Recipe.getIngredientsForPlan(userId, (err, recipes) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching food plan ingredients' });
      return;
    }
    res.json(recipes);
  });
};


