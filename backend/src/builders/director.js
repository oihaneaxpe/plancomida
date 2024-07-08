class Director {
    constructor(builder) {
      this.builder = builder;
    }
  
    constructRecipe(data) {
      this.builder
        .setTitle(data.title)
        .setSubtitle(data.subtitle)
        .setPreparationTime(data.preparationTime)
        .setServings(data.servings)
        .setCategory(data.category)
        .setDifficulty(data.difficulty)
        .setIngredients(data.ingredients)
        .setSteps(data.steps)
        .setImage(data.imagePath);
      return this.builder.getResult();
    }
  }
  
  module.exports = Director;
  