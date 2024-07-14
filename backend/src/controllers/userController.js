require('dotenv').config();

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

exports.registerUser = (req, res) => {
  const userData = req.body;
  User.registerUser(userData, (err, result) => {

    if (err) {
      res.status(500).json({ error: 'Error registrando el usuario' });
      return;
    }
    res.status(201).json({ message: 'Usuario registrado con éxito', userId: result.insertId });
  });
};


exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Usuario no registrado' });
      return;
    }

    if (!user) {
      res.status(400).json({ error: 'Email o contraseña inválido' });
      return;
    }

    // Comparar la contraseña ingresada con la hasheada almacenada
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).json({ error: 'Email o contraseña inválido' });
        return;
      }

      if (!isMatch) {
        res.status(400).json({ error: 'Contraseña incorrecta' });
        return;
      }
      
      const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '0.25h' });

      // Contraseña válida, proceder con el login
      res.status(200).json({ 
        message: 'Login successful', 
        token: token,
        userId: user.idtmUsuario 
      });
    });
  });
};