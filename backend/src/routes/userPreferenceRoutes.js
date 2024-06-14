const express = require('express');
const router = express.Router();
const userPreferenceController = require('../controllers/userPreferenceController');
const UserPreference = require('../models/userPreferenceModel');

router.get('/user-preference', userPreferenceController.getUserPreference);
router.post('/user-preference/user/:userId/preference', userPreferenceController.saveUserPreference);


// Ruta para obtener las preferencias del usuario con detalles
router.get('/user/:userId/preference', (req, res) => {
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
});
module.exports = router;
