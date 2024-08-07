const Recipe = require('../models/recipeModel');
const Director = require('../builders/director');
const ConcreteRecipeBuilder = require('../builders/concreteRecipeBuilder');

exports.getAllStandardRecipes = async (req, res) => {
  await Recipe.getAllStandardRecipes((err, recipes) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo recetas estándares' });
      return;
    }
    res.json(recipes);
  });
};

exports.getAllRecipes = async (req, res) => {
  const userId = req.params.id;
  let allRecipes = [];

  // Obtener todas las recetas estándar
  await Recipe.getAllStandardRecipes(async (err, standardRecipes) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo recetas' });
      return;
    }
    
    // Agregar las recetas estándar al array allRecipes
    allRecipes = allRecipes.concat(standardRecipes);

    // Obtener las recetas por usuario
    await Recipe.getAllRecipesByUserId(userId, (err, userRecipes) => {
      if (err) {
        res.status(500).json({ error: 'Error obteniendo recetas de usuario' });
        return;
      }
      
      // Agregar las recetas por usuario al array allRecipes
      allRecipes = allRecipes.concat(userRecipes);

      res.json(allRecipes);
    });
  });
};

exports.getRecipeById = async (req, res) => {
  const recipeId = req.params.id;
  // Step 1: Get the recipe generic information
  await Recipe.getRecipeById(recipeId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo el detalle de la receta' });
      return;
    }

    res.json(result);
  });
};

exports.addRecipe = async (req, res) => {
  const userId = req.params.id;
  const recipeData = req.body;

  const director = new Director(new ConcreteRecipeBuilder());
  const newRecipe = director.constructRecipe(recipeData);
  
  // Step 1: Add the recipe
  await Recipe.addRecipe(userId, newRecipe, async (err, recipeResult) => {
    if (err) {
      res.status(500).json({ error: 'Error añadiendo la receta' });
      return;
    }

    const recipeId = recipeResult.insertId;
    const ingredients = newRecipe.ingredients;
    const steps = newRecipe.steps;

    // Step 2: Add ingredients for the recipe
    await Recipe.addIngredients(recipeId, ingredients, async (err, ingredientsResult) => {
      if (err) {
        res.status(500).json({ error: 'Error añadiendo los ingredientes' });
        return;
      }

      // Step 3: Add steps for the recipe
      await Recipe.addSteps(recipeId, steps, (err, stepsResult) => {
        if (err) {
          res.status(500).json({ error: 'Error añadiendo los pasos de elaboración' });
          return;
        }

        // If recipe, ingredients, and steps were added successfully
        res.json({ message: 'Receta, ingredientes y pasos de elaboración añadidos con éxito' });
      });
    });
  });
};

exports.getIngredientsForPlan = async (req, res) => {
  const userId = req.params.id;
  await Recipe.getIngredientsForPlan(userId, (err, recipes) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo los ingredientes de la planificación semanal' });
      return;
    }
    res.json(recipes);
  });
};


