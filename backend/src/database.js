const mysql = require('mysql2');

class Database {
  constructor() {
    if (!Database.instance) {
      this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'oihane',
        password: 'Oihane@001',
        database: 'planificaciondecomidas'
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
