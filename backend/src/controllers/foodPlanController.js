const FoodPlan = require('../models/foodPlanModel');

exports.getPlanification = (req, res) => {
  const userId = req.params.id;
  FoodPlan.getPlanification(userId, (err, foodplan) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching planification' });
      return;
    }
    res.json(foodplan);
  });
};

