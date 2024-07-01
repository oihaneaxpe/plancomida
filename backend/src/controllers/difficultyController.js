const Difficulty = require('../models/difficultyModel');

exports.getAllDifficulty = (req, res) => {
  Difficulty.getAllDifficulty((err, difficulty) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching category' });
      return;
    }
    res.json(difficulty);
  });
};

