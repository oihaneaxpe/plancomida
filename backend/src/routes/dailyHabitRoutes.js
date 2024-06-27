const express = require('express');
const router = express.Router();
const dailyHabitController = require('../controllers/dailyHabitController');

router.get('/daily-habit/actual/:id', dailyHabitController.getActualHabit);
router.post('/daily-habit/update/:id', dailyHabitController.updateActualHabit);

module.exports = router;
