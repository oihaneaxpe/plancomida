require('dotenv').config();
const mysql = require('mysql2');

class Database {
  constructor() {
    
    if (!Database.instance) {
      this.connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
      });

      Database.instance = this;
    }

    return Database.instance;
  }

  connect() {
    this.connection.connect(err => {
      if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL');
    });
  }

  query(sql, params, callback) {
    this.connection.query(sql, params, callback);
  }

  // Otros métodos para interactuar con la base de datos
}

module.exports = new Database();
