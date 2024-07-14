const FoodPlan = require('../models/foodPlanModel');

exports.getPlanification = (req, res) => {
  const userId = req.params.id;
  FoodPlan.getPlanification(userId, (err, foodplan) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo la planificación semanal' });
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
      res.status(500).json({ error: 'Error actualizando la planificación semanal' });
      return;
    }
    res.json({ message: 'Planificación semanal actualizado con éxito', id: result.insertId });
  });
};