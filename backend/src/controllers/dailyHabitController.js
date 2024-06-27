const DailyHabit = require('../models/dailyHabitModel');

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

