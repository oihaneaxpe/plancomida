const db = require('../database');
const moment = require('moment');

class UserPreference {

  static getUserPreference(userId, callback) {
    //WHERE tmpreferenciausuario.idUsuario = ?
    db.query(`
      SELECT idtmPreferenciaUsuario, idUsuario, alturaNbr, pesoNbr, sexo, fechaNacimientoDte
        , tmpreferenciausuario.idTipoEjercicio, tmtipoejercicio.nombre as tipoEjercicioNombre
        , tmpreferenciausuario.idTipoDieta, tmtipodieta.nombre as tipoDietaNombre
      FROM tmpreferenciausuario
        LEFT JOIN tmtipoejercicio ON tmpreferenciausuario.idTipoEjercicio = tmtipoejercicio.idtmTipoEjercicio
        LEFT JOIN tmtipodieta ON tmpreferenciausuario.idTipoDieta = tmtipodieta.idtmTipoDieta
      ;
      `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static getAlergias(userId, callback) {
    db.query(`SELECT * FROM tmalergia WHERE bajaInd = 0;`, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static getCheckedAlergias(userId, callback) {
    db.query(`SELECT idtmAlergia, nombre as alergiaNombre, habilitado
    FROM tmalergia
      INNER JOIN tmpreferenciausuarioalergia ON tmalergia.idtmAlergia = tmpreferenciausuarioalergia.idAlergia
    WHERE tmalergia.bajaInd = 0;
    `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static getHealthProblems(userId, callback) {
    db.query(`SELECT * FROM tmproblemassalud WHERE bajaInd = 0;`, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
  static getCheckedHealthProblems(userId, callback) {
    db.query(`SELECT idtmProblemasSalud, nombre as problemaSaludNombre, habilitado
    FROM tmproblemassalud
      INNER JOIN tmpreferenciausuarioproblemassalud ON tmproblemassalud.idtmProblemasSalud = tmpreferenciausuarioproblemassalud.idProblemasSalud
    WHERE tmproblemassalud.bajaInd = 0;
    `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  // static getUserPreferenceWithDetails(userId, callback) {
  //   console.log(userId, "dd")
  //   // Query para obtener las preferencias del usuario junto con el tipo de ejercicio y tipo de dieta
  //   const query = `
  //     SELECT
  //       p.idtmPreferenciaUsuario, p.idUsuario, p.alturaNbr, p.pesoNbr, p.sexo, p.fechaNacimientoDte,
  //       p.idTipoEjercicio, te.nombre as tipoEjercicioNombre,
  //       p.idTipoDieta, td.nombre as tipoDietaNombre
  //     FROM tmpreferenciausuario p
  //     LEFT JOIN tmtipoejercicio te ON p.idTipoEjercicio = te.idtmTipoEjercicio
  //     LEFT JOIN tmtipodieta td ON p.idTipoDieta = td.idtmTipoDieta
  //     WHERE p.idUsuario = ?;
  //   `;

  //   // Query para obtener las alergias del usuario
  //   const queryAlergias = `
  //     SELECT a.idAlergia, a.nombre
  //     FROM tmusuario u
  //     INNER JOIN tmrelusuarioalergia rua ON u.idUsuario = rua.idUsuario
  //     INNER JOIN tmagergia a ON rua.idAlergia = a.idAlergia
  //     WHERE u.idUsuario = ?;
  //   `;

  //   // Query para obtener los problemas de salud del usuario
  //   const queryProblemasSalud = `
  //     SELECT ps.idProblemaSalud, ps.nombre
  //     FROM tmusuario u
  //     INNER JOIN tmrelusuarioproblemasalud rup ON u.idUsuario = rup.idUsuario
  //     INNER JOIN tmproblemassalud ps ON rup.idProblemaSalud = ps.idProblemaSalud
  //     WHERE u.idUsuario = ?;
  //   `;

  //   // Ejecutar las consultas en paralelo
  //   db.query(query, [userId], (err, resultsUserPreference) => {
  //     if (err) {
  //       callback(err, null);
  //       return;
  //     }

  //     db.query(queryAlergias, [userId], (err, resultsAlergias) => {
  //       if (err) {
  //         callback(err, null);
  //         return;
  //       }

  //       db.query(queryProblemasSalud, [userId], (err, resultsProblemasSalud) => {
  //         if (err) {
  //           callback(err, null);
  //           return;
  //         }

  //         // Estructurar los datos para enviar al callback
  //         const userPreference = resultsUserPreference[0]; // Solo un registro se espera
  //         const alergias = resultsAlergias;
  //         const problemasSalud = resultsProblemasSalud;

  //         const responseData = {
  //           userPreference: {
  //             alturaNbr: userPreference.alturaNbr,
  //             pesoNbr: userPreference.pesoNbr,
  //             sexo: userPreference.sexo,
  //             fechaNacimientoDte: userPreference.fechaNacimientoDte,
  //             idTipoEjercicio: userPreference.idTipoEjercicio,
  //             tipoEjercicioNombre: userPreference.tipoEjercicioNombre,
  //             idTipoDieta: userPreference.idTipoDieta,
  //             tipoDietaNombre: userPreference.tipoDietaNombre,
  //           },
  //           alergias: alergias,
  //           problemasSalud: problemasSalud,
  //         };

  //         callback(null, responseData);
  //       });
  //     });
  //   });
  // }

  // ADD DATA
  // Método para guardar o actualizar preferencias de usuario
  static saveUserPreferenceProperties(userId, preferenceData, callback) {
    console.log(userId, preferenceData, "a")
    const { alturaNbr, pesoNbr, sexo, fechaNacimientoDte, idTipoEjercicio, idTipoDieta } = preferenceData;
    
    // Comprobamos si ya existen preferencias para el usuario
    db.query(
      'SELECT * FROM tmpreferenciausuario WHERE idUsuario = ?',
      [userId],
      (err, results) => {
        if (err) {
          callback(err, null);
          return;
        }

        // Convertir la fecha al formato requerido por MySQL (YYYY-MM-DD)
        const fechaNacimientoFormatted = moment(fechaNacimientoDte).format('YYYY-MM-DD');
        
        // Si existen preferencias, actualizamos
        if (results.length > 0) {
          db.query(
            `UPDATE tmpreferenciausuario 
            SET alturaNbr = ?, pesoNbr = ?, sexo = ?, idTipoEjercicio = ?, idTipoDieta = ?, fechaNacimientoDte = ?
            WHERE idUsuario = ?`,
            [alturaNbr, pesoNbr, sexo, idTipoEjercicio, idTipoDieta, fechaNacimientoFormatted, userId],
            (err, result) => {
              if (err) {
                callback(err, null);
                return;
              }
              callback(null, result);
            }
          );
        } else {
          // Si no existen, insertamos
          db.query(
            `INSERT INTO tmpreferenciausuario (idUsuario, alturaNbr, pesoNbr, sexo, fechaNacimientoDte, idTipoEjercicio, idTipoDieta)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userId, alturaNbr, pesoNbr, sexo, fechaNacimientoDte, idTipoEjercicio, idTipoDieta],
            (err, result) => {
              if (err) {
                callback(err, null);
                return;
              }
              callback(null, result);
            }
          );
        }
      }
    );
  }
  // Método para guardar condiciones de salud
  static saveHealthConditions(userId, healthConditions, callback) {
    db.query('DELETE FROM user_health_conditions WHERE idUsuario = ?', [userId], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }

      const values = healthConditions.map(condition => [userId, condition.id, condition.checked]);
      db.query('INSERT INTO user_health_conditions (idUsuario, idCondition, checked) VALUES ?', [values], (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      });
    });
  }

  // Método para guardar alergias
  static saveAllergies(userId, allergies, callback) {
    db.query('DELETE FROM user_allergies WHERE idUsuario = ?', [userId], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }

      const values = allergies.map(allergy => [userId, allergy.id, allergy.checked]);
      db.query('INSERT INTO user_allergies (idUsuario, idAllergy, checked) VALUES ?', [values], (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      });
    });
  }
}

module.exports = UserPreference;
