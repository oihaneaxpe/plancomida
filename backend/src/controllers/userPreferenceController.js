const UserPreference = require('../models/userPreferenceModel');

exports.getUserPreference = (req, res) => {
  UserPreference.getUserPreference((err, userpreference) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching user preference' });
      return;
    }
    res.json(userpreference);
  });
};

// Controlador para obtener las preferencias del usuario con detalles de alergias y problemas de salud
exports.getUserPreferenceWithDetails = (req, res) => {
  const userId = req.params.userId; // Suponiendo que el userId se pasa como parámetro en la URL
console.log("sss", userId)
  UserPreference.getUserPreferenceWithDetails(userId, (err, result) => {
    if (err) {
      console.error('Error al obtener preferencias del usuario:', err);
      res.status(500).json({ error: 'Error al obtener preferencias del usuario' });
      return;
    }

    res.json(result); // Devuelve la respuesta con las preferencias, alergias y problemas de salud
  });
};


// Controlador para actualizar las preferencias del usuario
exports.saveUserPreference = (req, res) => {
  const userId =1; // Asegúrate de que el ID del usuario viene en el cuerpo de la solicitud
  const userPreference = req.body;

  UserPreference.saveUserPreference(userId, userPreference, (err, result) => {
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