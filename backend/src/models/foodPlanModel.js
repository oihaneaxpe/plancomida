const db = require('../database');

class FoodPlan {
  static getPlanification(callback) {
    db.query(`SELECT taplanificacion.*, tmreceta.titulo
    FROM taplanificacion
      INNER JOIN tmreceta ON taplanificacion.idReceta = tmreceta.idtmReceta
    WHERE taplanificacion.bajaInd = 0;
    `, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);

      callback(null, results);
    });
  }
}

module.exports = FoodPlan;
