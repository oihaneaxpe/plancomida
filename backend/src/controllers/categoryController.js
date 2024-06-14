const Category = require('../models/categoryModel');

exports.getAllCategory = (req, res) => {
  Category.getAllCategory((err, category) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching category' });
      return;
    }
    console.log("category",category);
    res.json(category);
  });
};

