const FoodPlan = require('../models/foodPlanModel');

exports.getPlanification = (req, res) => {
  FoodPlan.getPlanification((err, foodplan) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching planification' });
      return;
    }
    res.json(foodplan);
  });
};
