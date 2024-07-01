require('dotenv').config();

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

exports.registerUser = (req, res) => {
  const userData = req.body;
  User.registerUser(userData, (err, result) => {

    if (err) {
      res.status(500).json({ error: 'Error creating user' });
      return;
    }
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  });
};


exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Error finding user' });
      return;
    }

    if (!user) {
      res.status(400).json({ error: 'Invalid email or password' });
      return;
    }

    // Comparar la contraseña ingresada con la hasheada almacenada
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).json({ error: 'Invalid email or password' });
        return;
      }

      if (!isMatch) {
        res.status(400).json({ error: 'Invalid password' });
        return;
      }

      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '0.25h' });

      // Contraseña válida, proceder con el login
      res.status(200).json({ message: 'Login successful', token });
    });
  });
};