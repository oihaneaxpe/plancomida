const UserPreference = require('../models/userPreferenceModel');

// Controlador para obtener las preferencias del usuario con detalles de alergias y problemas de salud
// exports.getUserPreferenceWithDetails = (req, res) => {
//   const userId = req.params.userId; // Suponiendo que el userId se pasa como parámetro en la URL
// console.log("userId", userId)
//   UserPreference.getUserPreferenceWithDetails(userId, (err, result) => {
//     if (err) {
//       console.error('Error al obtener preferencias del usuario:', err);
//       res.status(500).json({ error: 'Error al obtener preferencias del usuario' });
//       return;
//     }

//     res.json(result); // Devuelve la respuesta con las preferencias, alergias y problemas de salud
//   });
// };

exports.getUserPreferenceWithDetails = (req, res) => {
  const userId = req.params.userId;
  
  UserPreference.getUserPreference(userId, (err, userPreference) => {
    if (err) {
      return res.status(500).json({ error: 'Error getting user preference' });
    }

    UserPreference.getAlergias(userId, (err, alergias) => {
      if (err) {
        return res.status(500).json({ error: 'Error getting alergias' });
      }

      UserPreference.getHealthProblems(userId, (err, problemasSalud) => {
        if (err) {
          return res.status(500).json({ error: 'Error getting health problems' });
        }

        UserPreference.getCheckedAlergias(userId, (err, activoAlergias) => {
          if (err) {
            return res.status(500).json({ error: 'Error getting health problems' });
          }

          UserPreference.getCheckedHealthProblems(userId, (err, activoProblemasSalud) => {
              if (err) {
                  return res.status(500).json({ error: 'Error getting health problems' });
              }
  
              res.json({
                  userPreference: userPreference[0], // Asumiendo que userPreference es un array con un único elemento
                  alergias: alergias,
                  problemasSalud: problemasSalud,
                  activoProblemasSalud: activoProblemasSalud,
                  activoAlergias: activoAlergias
              });
          });
      });
    });
  });
});
};


// Controlador para actualizar las preferencias del usuario
exports.saveUserPreference = (req, res) => {
  const userId = req.params.userId;
  const userPreference = req.body;

  UserPreference.saveUserPreferenceProperties(userId, userPreference, (err, result) => {
    if (err) {
      console.error('Error updating user preference:', err);
      res.status(500).json({ error: 'Error updating user preference' });
      return;
    }

    res.status(200).json({
      message: 'User Preference updated successfully',
      data: result
    });
  });
};