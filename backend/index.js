const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',     
  user: 'root',   
  password: '', 
  database: 'studyhub' 
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar con MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

app.get('/api/usuario', (req, res) => {
  db.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener los datos' });
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
