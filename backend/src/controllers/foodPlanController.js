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

exports.updatePlanification = (req, res) => {
  const userId = req.params.id;
  const weekPlanificationData = req.body;

  FoodPlan.updatePlanification(userId, weekPlanificationData, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error updating planification' });
      return;
    }
    res.json({ message: 'Planification updated successfully', id: result.insertId });
  });
};