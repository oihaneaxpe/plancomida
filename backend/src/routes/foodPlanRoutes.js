const express = require('express');
const router = express.Router();
const foodPlanController = require('../controllers/foodPlanController');

router.get('/food-plan/:id', foodPlanController.getPlanification);

module.exports = router;
