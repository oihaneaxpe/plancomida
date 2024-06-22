const User = require('../models/userModel');

exports.registerUser = (req, res) => {
  const userData = req.body;
  User.registerUser(userData, (err, result) => {
    console.log(userData)
    if (err) {
      res.status(500).json({ error: 'Error creating user' });
      console.log(err)
      return;
    }
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  });
};