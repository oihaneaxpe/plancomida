const UserPreference = require('../models/userPreferenceModel');

exports.getUserPreferenceWithDetails = (req, res) => {
  const userId = req.params.userId;
  
  UserPreference.getUserPreference(userId, (err, userPreference) => {
    if (err) {
      return res.status(500).json({ error: 'Error getting user preference' });
    }

    UserPreference.getAllergies(userId, (err, alergias) => {
      if (err) {
        return res.status(500).json({ error: 'Error getting alergias' });
      }

      UserPreference.getHealthProblems(userId, (err, problemasSalud) => {
        if (err) {
          return res.status(500).json({ error: 'Error getting health problems' });
        }

        UserPreference.getCheckedAllergies(userId, (err, activoAlergias) => {
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
      res.status(500).json({ error: 'Error updating user preference' });
      return;
    }

    UserPreference.saveHealthProblems(1, userPreference.healthConditions, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Error updating health problem' });
        return;
      }
  
      UserPreference.saveAllergies(1, userPreference.allergies, (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Error updating allergies' });
          return;
        }
    
        res.status(200).json({
          message: 'User Preference updated successfully',
          data: result
        });
      });
    });
  });
};