const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const difficultyRoutes = require('./routes/difficultyRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const userPreferenceRoutes = require('./routes/userPreferenceRoutes');
const foodPlanRoutes = require('./routes/foodPlanRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Middleware para parsear JSON
app.use(bodyParser.json());

// Configuración de rutas
app.use('/api', recipeRoutes);
app.use('/api', categoryRoutes);
app.use('/api', difficultyRoutes);
app.use('/api', shoppingListRoutes);
app.use('/api', foodPlanRoutes);
// app.use('/api', userPreferenceRoutes);
app.use('/api/user-preference', userPreferenceRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Hola mundo desde Express!');
});

// Manejo de errores 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).send('Error 404: Página no encontrada');
});

// Manejo de errores 500 (Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error 500: Algo salió mal en el servidor');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
