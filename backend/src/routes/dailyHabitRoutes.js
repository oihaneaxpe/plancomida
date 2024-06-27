const express = require('express');
const router = express.Router();
const dailyHabitController = require('../controllers/dailyHabitController');

router.get('/daily-habit/actual/:id', dailyHabitController.getActualHabit);

module.exports = router;
