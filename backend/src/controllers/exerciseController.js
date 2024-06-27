const Exercise = require('../models/exerciseModel');

exports.getAllExercise = (req, res) => {
  Exercise.getAllExercise((err, exercise) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching exercise' });
      return;
    }
    console.log("exercise", exercise);
    res.json(exercise);
  });
};

