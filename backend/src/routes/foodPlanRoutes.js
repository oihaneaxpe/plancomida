const express = require('express');
const router = express.Router();
const foodPlanController = require('../controllers/foodPlanController');

router.get('/food-plan', foodPlanController.getPlanification);

module.exports = router;
