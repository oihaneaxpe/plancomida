const express = require('express');
const router = express.Router();
const difficultyController = require('../controllers/difficultyController');

router.get('/difficulty', difficultyController.getAllDifficulty);

module.exports = router;
