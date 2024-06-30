const db = require('../database');
const moment = require('moment');

class UserPreference {

  static getUserPreference(userId, callback) {
    db.query(`
      SELECT idtmPreferenciaUsuario, idUsuario, alturaNbr, pesoNbr, sexo, fechaNacimientoDte
        , tmpreferenciausuario.idTipoEjercicio, tmtipoejercicio.nombre as tipoEjercicioNombre
        , tmpreferenciausuario.idTipoDieta, tmtipodieta.nombre as tipoDietaNombre
      FROM tmpreferenciausuario
        LEFT JOIN tmtipoejercicio ON tmpreferenciausuario.idTipoEjercicio = tmtipoejercicio.idtmTipoEjercicio
        LEFT JOIN tmtipodieta ON tmpreferenciausuario.idTipoDieta = tmtipodieta.idtmTipoDieta
      WHERE tmpreferenciausuario.idUsuario = ?
      ;
      `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static getAllergies(userId, callback) {
    db.query(`SELECT * FROM tmalergia WHERE bajaInd = 0;`, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  static getCheckedAllergies(userId, callback) {
    db.query(`SELECT idtmAlergia, nombre as alergiaNombre, habilitado
    FROM tmalergia
      INNER JOIN tmpreferenciausuarioalergia ON tmalergia.idtmAlergia = tmpreferenciausuarioalergia.idAlergia
      INNER JOIN tmpreferenciausuario ON tmpreferenciausuarioalergia.idPreferenciaUsuario = tmpreferenciausuario.idtmPreferenciaUsuario
    WHERE tmalergia.bajaInd = 0
      AND tmpreferenciausuario.idUsuario = ?;
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
      INNER JOIN tmpreferenciausuario ON tmpreferenciausuarioproblemassalud.idPreferenciaUsuario = tmpreferenciausuario.idtmPreferenciaUsuario
    WHERE tmproblemassalud.bajaInd = 0
      AND tmpreferenciausuario.idUsuario = ?;
    `, [userId], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  // ADD DATA
  // Método para guardar o actualizar preferencias de usuario
  static saveUserPreferenceProperties(userId, preferenceData, callback) {
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

  static deleteCheckedAllergies(preferenciaId, callback) {
    db.query(
      `DELETE FROM tmpreferenciausuarioalergia WHERE idPreferenciaUsuario = ?`,
      [preferenciaId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      }
    );
  }

  static deleteCheckedHealthProblems(preferenceId, callback) {
    db.query(
      `DELETE FROM tmpreferenciausuarioproblemassalud WHERE idPreferenciaUsuario = ?;`,
      [preferenceId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        // callback(null, result);
      }
    );
  }
  // Método para guardar condiciones de salud
  static saveCheckedHealthProblems(preferenceId, healthProblems, callback) {
      const values = healthProblems.map(condition => [preferenceId, condition.id, condition.checked]);
      db.query(`INSERT INTO tmpreferenciausuarioproblemassalud (idPreferenciaUsuario, idProblemasSalud, habilitado) 
                VALUES ?`, [values], (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      });
  }

  static saveHealthProblems(preferenceId, healthProblems, callback) {
    this.deleteCheckedHealthProblems(preferenceId, healthProblems, callback);
    this.saveCheckedHealthProblems(preferenceId, healthProblems, callback);
  }

  static deleteCheckedAllergies(preferenceId, callback) {
    db.query(
      `DELETE FROM tmpreferenciausuarioalergia WHERE idPreferenciaUsuario = ?;`,
      [preferenceId],
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        // callback(null, result);
      }
    );
  }
  // Método para guardar alergias
  static saveCheckedAllergies(preferenceId, allergies, callback) {
      const values = allergies.map(condition => [preferenceId, condition.id, condition.checked]);
      db.query(`INSERT INTO tmpreferenciausuarioalergia (idPreferenciaUsuario, idAlergia, habilitado) 
                VALUES ?`, [values], (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result);
      });
  }

  static saveAllergies(preferenceId, allergies, callback) {
    this.deleteCheckedAllergies(preferenceId, allergies, callback);
    this.saveCheckedAllergies(preferenceId, allergies, callback);
  }
}

module.exports = UserPreference;
