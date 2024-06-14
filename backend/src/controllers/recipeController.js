const Recipe = require('../models/recipeModel');

exports.getAllRecipes = (req, res) => {
  Recipe.getAllRecipes((err, recipes) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching recipes' });
      return;
    }
    res.json(recipes);
  });
};

exports.addRecipew = (req, res) => {
  const recipeData = req.body;

  // Step 1: Add the recipe
  Recipe.addRecipe(recipeData, (err, result) => {
    if (err) {
      console.error('Error adding recipe:', err);
      res.status(500).json({ error: 'Error adding recipe' });
      return;
    }

    const recipeId = result.insertId;
    const ingredients = recipeData.ingredients;
    const steps = recipeData.steps;

    // Step 2: Add ingredients for the recipe
    Recipe.addIngredients(recipeId, ingredients, (err, result) => {
      if (err) {
        console.error('Error adding ingredients:', err);
        res.status(500).json({ error: 'Error adding ingredients' });
        return;
      }

      // If both recipe and ingredients were added successfully
      res.json({ message: 'Recipe and ingredients added successfully' });

      // Step 3: Add steps for the recipe
      Recipe.addSteps(recipeId, steps, (err, result) => {
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

exports.addRecipe = (req, res) => {
  const recipeData = req.body;

  // Step 1: Add the recipe
  Recipe.addRecipe(recipeData, (err, recipeResult) => {
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