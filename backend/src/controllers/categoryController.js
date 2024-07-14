const Category = require('../models/categoryModel');

exports.getAllCategory = (req, res) => {
  Category.getAllCategory((err, category) => {
    if (err) {
      res.status(500).json({ error: 'Error obteniendo las categorías' });
      return;
    }
    res.json(category);
  });
};

