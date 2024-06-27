const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/exercise', exerciseController.getAllExercise);

module.exports = router;
