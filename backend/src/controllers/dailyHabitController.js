const DailyHabit = require('../models/dailyHabitModel');
const Exercise = require('../models/exerciseModel');

exports.getActualHabit = (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  
  DailyHabit.getActualHabit(userId, (err, dailyHabit) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching daily habit' });
      return;
    }
    console.log("Daily Habit", dailyHabit);
    res.json(dailyHabit);
  });
};

exports.updateActualHabit = (req, res) => {
  const userId = req.params.id;
  const dailyHabitData = req.body;

  console.log("userid controller", userId, dailyHabitData)
  console.log(userId);
  const exerciseName = dailyHabitData.nombreEjercicio;
  // Obtener el idTipoEjercicio utilizando el nombre del ejercicio
  Exercise.getidExerciseByName(exerciseName, (err, exerciseResult) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching exercise id' });
      return;
    }

    if (exerciseResult.length === 0) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    const idTipoEjercicio = exerciseResult[0].id;
    dailyHabitData.idTipoEjercicio = idTipoEjercicio;

    // Ahora actualiza o inserta el hábito diario
    DailyHabit.updateActualHabit(userId, dailyHabitData, (err, dailyHabitResult) => {
      if (err) {
        res.status(500).json({ error: 'Error updating daily habit' });
        return;
      }

      console.log("Daily Habit", dailyHabitResult);
      res.json({ message: 'Daily habit updated successfully' });
    });
  });


  // DailyHabit.updateActualHabit(userId, dailyHabitData, (err, dailyHabitResult) => {
  //   if (err) {
  //     res.status(500).json({ error: 'Error updating daily habit' });
  //     return;
  //   }
  //    console.log("Daily Habit", dailyHabitResult);
  //   res.json({ message: 'Daily habit updated successfully' });
  // });
};