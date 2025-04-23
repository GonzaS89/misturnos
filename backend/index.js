import express from 'express';
import cors from 'cors';
import db from './db.js'; // Importa la conexión a la base de datos

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Middleware para procesar JSON en el body de las peticiones

app.get('/api/profesionales', (req,res) => {
  db.query('SELECT * FROM profesionales', (err, results) => {
    if(err){
      console.error('Error al obtener los resultados')
      res.status(500).send('Error al obtener los resultados')
    }

    res.json(results)
  })
})

app.listen(PORT, () => {
  console.log(`Backend corriendo en http:/localhost:${PORT}`)
})






















