const db = require('../database');

class FoodPlan {
  static getPlanification(callback) {
    db.query(`SELECT taplanificacion.*, tmreceta.titulo
    , tmdiasemana.nombre as diaNombre
    , tmmomento.nombre as momentoNombre
      FROM taplanificacion
        INNER JOIN tmreceta ON taplanificacion.idReceta = tmreceta.idtmReceta
        INNER JOIN tmdiasemana ON taplanificacion.idDia = tmdiasemana.idtmDiaSemana
        INNER JOIN tmmomento ON taplanificacion.idMomento = tmmomento.idtmmomento
      WHERE taplanificacion.bajaInd = 0;
    `, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, results);
    });
  }
}

module.exports = FoodPlan;
