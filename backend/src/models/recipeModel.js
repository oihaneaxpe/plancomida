const db = require('../database');

class Recipe {
  static getAllRecipes(callback) {
    db.query('SELECT tmreceta.*, tmcategoria.nombre as categoriaNombre, tmdificultad.nombre as dificultadNombre'
    +' FROM tmreceta '
      +' INNER JOIN tmcategoria ON tmreceta.idCategoria = tmcategoria.idtmCategoria'
      +' INNER JOIN tmdificultad ON tmreceta.idDificultad = tmdificultad.idtmDificultad'
      +' WHERE tmreceta.BajaInd = 0;', (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, results);
    });
  }

  static addRecipe(recipeData, callback) {
    const getCategorySql = `SELECT idtmCategoria FROM tmCategoria WHERE nombre = ?`;
  db.query(getCategorySql, [recipeData.category], (err, categoryResult) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (categoryResult.length === 0) {
      callback(new Error('Categoría no encontrada'), null);
      return;
    }

    const idCategoria = categoryResult[0].idtmCategoria;

    console.log(idCategoria)
    // Luego, obtenemos el id de la dificultad
    const getDifficultySql = `SELECT idtmDificultad FROM tmDificultad WHERE nombre = ?`;
    db.query(getDifficultySql, [recipeData.difficulty], (err, difficultyResult) => {
      if (err) {
        callback(err, null);
        return;
      }

      if (difficultyResult.length === 0) {
        callback(new Error('Dificultad no encontrada'), null);
        return;
      }

      const idDificultad = difficultyResult[0].idtmDificultad;

      // Insertamos la receta en tmreceta
      const insertRecipeSql = `
        INSERT INTO tmreceta (titulo, subtitulo, tiempoPreparacionNbr, cantidadComensalNbr, idCategoria, idDificultad)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const params = [
        recipeData.title,
        recipeData.subtitle,
        recipeData.preparationTime,
        recipeData.servings,
        idCategoria,
        idDificultad
      ];

      db.query(insertRecipeSql, params, (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }

        callback(null, result);
      });
    });
  });
  }

  static addIngredients(recipeId, ingredients, callback) {
    const sql = 'INSERT INTO tmrecetaingrediente (idReceta, nombre) VALUES ?';
    const values = ingredients.map(ingredient => [recipeId, ingredient.item]);
  
    db.query(sql, [values], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static addSteps(recipeId, steps, callback) {
    const sql = 'INSERT INTO tmrecetastep (idReceta, descripcion) VALUES ?';
    const values = steps.map(step => [recipeId, step.item]);
  
    if (steps.length > 0) {
      db.query(sql, [values], (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results);
      });
    }
    
  }

  static getRecipeById(id, callback) {
    // Query para obtener la información generica de la receta seleccionada
    const queryGeneric = `SELECT tmreceta.*, tmcategoria.nombre as categoriaNombre, tmdificultad.nombre as dificultadNombre
    FROM tmreceta 
      INNER JOIN tmcategoria ON tmreceta.idCategoria = tmcategoria.idtmCategoria
      INNER JOIN tmdificultad ON tmreceta.idDificultad = tmdificultad.idtmDificultad
    WHERE tmreceta.BajaInd = 0 AND tmreceta.idtmReceta = ?;`;


    // Query para obtener los ingredientes de la receta seleccionada
    const queryIngredients = `SELECT *
    FROM tmrecetaingrediente
    WHERE bajaInd = 0 AND idReceta = ?;`;

    // Query para obtener los stepts de la receta seleccionada
    const querySteps = `SELECT *
    FROM tmrecetastep
    WHERE bajaInd = 0 AND idReceta = ?;`;

    // Ejecutar las consultas en paralelo
    db.query(queryGeneric, [id], (err, resultsRecipeInfoGeneric) => {
      if (err) {
        callback(err, null);
        return;
      }

      db.query(queryIngredients, [id], (err, resultsRecipeIngredients) => {
        if (err) {
          callback(err, null);
          return;
        }

        db.query(querySteps, [id], (err, resultsRecipeSteps) => {
          if (err) {
            callback(err, null);
            return;
          }

          const responseData = {
            ...resultsRecipeInfoGeneric[0],
            ingredients: resultsRecipeIngredients,
            steps: resultsRecipeSteps,
          };

          callback(null, responseData);
        });
      });
    });
  }  

  static getIngredientsForPlan(userId, callback) {
    db.query(`SELECT DISTINCT tmrecetaingrediente.nombre as item, 0 as checked 
              FROM tmrecetaingrediente 
                INNER JOIN taplanificacion ON tmrecetaingrediente.idReceta = taplanificacion.idReceta
              WHERE tmrecetaingrediente.bajaInd = 0 AND taplanificacion.idUsuario = ?
              ORDER BY 1;
    `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
}

module.exports = Recipe;
