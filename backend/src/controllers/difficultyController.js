const Difficulty = require('../models/difficultyModel');

exports.getAllDifficulty = (req, res) => {
  Difficulty.getAllDifficulty((err, difficulty) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo los niveles de dificultad' });
      return;
    }
    res.json(difficulty);
  });
};

