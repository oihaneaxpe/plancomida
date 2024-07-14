const DailyHabit = require('../models/dailyHabitModel');
const Exercise = require('../models/exerciseModel');

exports.getActualHabit = async (req, res) => {
  const userId = req.params.id;
  
  await DailyHabit.getActualHabit(userId, (err, dailyHabit) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo los hábitos diarios' });
      return;
    }
    res.json(dailyHabit);
  });
};

exports.updateActualHabit = async (req, res) => {
  const userId = req.params.id;
  const dailyHabitData = req.body;

  const exerciseName = dailyHabitData.nombreEjercicio;
  // Obtener el idTipoEjercicio utilizando el nombre del ejercicio
  await Exercise.getidExerciseByName(exerciseName, (err, exerciseResult) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo el identificador de tipo de ejercicio' });
      return;
    }

    if (exerciseResult.length === 0) {
      res.status(404).json({ error: 'Ejercicio no encontrado' });
      return;
    }

    const idTipoEjercicio = exerciseResult[0].id;
    dailyHabitData.idTipoEjercicio = idTipoEjercicio;

    // Ahora actualiza o inserta el hábito diario
    DailyHabit.updateActualHabit(userId, dailyHabitData, (err, dailyHabitResult) => {
      if (err) {
        res.status(500).json({ error: 'Error actualizando hábitos diarios' });
        return;
      }

      res.json({ message: 'Hábitos diarios actualizados con éxito' });
    });
  });
};