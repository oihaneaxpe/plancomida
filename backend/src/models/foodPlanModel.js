const db = require('../database');

class FoodPlan {
  static async getPlanification(userId, callback) {
    db.query(`SELECT taplanificacion.*, tmreceta.titulo
                , tmdiasemana.nombre as diaNombre
                , tmmomento.nombre as momentoNombre
                , idCategoria
                , CASE idCategoria WHEN 2 THEN 'restaurant_menu'
                  WHEN 3 THEN 'dinner_dining'
                        WHEN 4 THEN 'cake'
                        WHEN 5 THEN 'free_breakfast'
                ELSE '' END AS icono
              FROM taplanificacion
                INNER JOIN tmreceta ON taplanificacion.idReceta = tmreceta.idtmReceta
                INNER JOIN tmdiasemana ON taplanificacion.idDia = tmdiasemana.idtmDiaSemana
                INNER JOIN tmmomento ON taplanificacion.idMomento = tmmomento.idtmmomento
              WHERE taplanificacion.bajaInd = 0
                AND taplanificacion.idUsuario = ?;
    `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }

      callback(null, results);
    });
  }
}

module.exports = FoodPlan;
