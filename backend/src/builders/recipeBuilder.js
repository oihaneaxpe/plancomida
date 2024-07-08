const Recipe = require('../models/recipeModel');

class RecipeBuilder {
  constructor() {
    this.recipe = new Recipe();
  }

  setTitle(title) {
    this.recipe.title = title;
    return this; 
  }

  setSubtitle(subtitle) {
    this.recipe.subtitle = subtitle;
    return this; 
  }

  setPreparationTime(preparationTime) {
    this.recipe.preparationTime = preparationTime;
    return this; 
  }

  setServings(servings) {
    this.recipe.servings = servings;
    return this; 
  }

  setCategory(category) {
    this.recipe.category = category;
    return this; 
  }

  setDifficulty(difficulty) {
    this.recipe.difficulty = difficulty;
    return this; 
  }

  setIngredients(ingredients) {
    this.recipe.ingredients = ingredients;
    return this; 
  }

  setSteps(steps) {
    this.recipe.steps = steps;
    return this; 
  }

  setImage(image) {
    this.recipe.image = image;
    return this; 
  }

  build() {
    return this.recipe;
  }
}

module.exports = RecipeBuilder;