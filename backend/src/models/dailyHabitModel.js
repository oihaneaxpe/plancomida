const db = require('../database');

class DailyHabitModel {
  static getActualHabit(userId, callback) {
    db.query(`SELECT idtahabito, idUsuario, aguaNbr, horasSueno, idTipoEjercicio, tmtipoejercicio.nombre as nombreEjercicio, CAST(meditacionInd AS UNSIGNED) AS meditacionInd
              , CAST(comidaSaludableInd AS UNSIGNED) AS comidaSaludableInd, notas
              , CAST(tahabito.bajaInd AS UNSIGNED) AS bajaInd
            FROM tahabito
            INNER JOIN tmtipoejercicio ON tahabito.idTipoEjercicio = tmtipoejercicio.idtmTipoEjercicio
            WHERE tahabito.bajaInd = 0 AND idUsuario = ?;
              `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      console.log(results);

      callback(null, results);
    });
  }
}

module.exports = DailyHabitModel;
