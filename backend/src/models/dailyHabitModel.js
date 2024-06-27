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
  static updateActualHabit(userId, actualHabitData, callback) {
    const params = [
      actualHabitData.aguaNbr,
      actualHabitData.horasSueno,
      actualHabitData.meditacionInd,
      actualHabitData.comidaSaludableInd,
      actualHabitData.notas,
      actualHabitData.idTipoEjercicio,
      userId
    ];

    // Comprobamos si ya existen habitos para el usuario
    db.query(
      'SELECT * FROM tahabito WHERE idUsuario = ?',
      [userId],
      (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }

        console.log("results", results)
        // Si existen habitos, actualizamos
        if (results.length > 0) {
          const updateActualHabit = `UPDATE tahabito 
                            SET aguaNbr = ?
                                , horasSueno = ?
                                , meditacionInd = ?
                                , comidaSaludableInd = ?
                                , notas = ?
                                , idTipoEjercicio = ?
                                WHERE idUsuario = ?;
                          `;        
          db.query(updateActualHabit, params, (err, result) => {
            if (err) {
              callback(err, null);
              return;
            }
      
            callback(null, result);
          });  
        } else {
          // Si no existen, insertamos
          const insertActualHabit = `
                  INSERT INTO tahabito (aguaNbr, horasSueno, meditacionInd, comidaSaludableInd, notas, idTipoEjercicio, idUsuario)
                  VALUES (?, ?, ?, ?, ?, ?, ?);
                `;
          db.query(insertActualHabit, params, (err, result) => {
            if (err) {
              callback(err, null);
              return;
            }
      
            callback(null, result);
          });
        }
      }
    );     
  }  
}

module.exports = DailyHabitModel;