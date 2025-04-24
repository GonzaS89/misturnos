import express from 'express';
import cors from 'cors';
import db from './db.js'; // Importa la conexión a la base de datos

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Middleware para procesar JSON en el body de las peticiones

app.get('/api/profesionales', (req, res) => {
  db.query('SELECT * FROM profesionales', (err, results) => {
    if (err) {
      console.error('Error al obtener los resultados')
      res.status(500).send('Error al obtener los resultados')
    }

    res.json(results)
  })
})

// app.post('/api/profesionales', (req, res) => {
//   const { nombre, apellido, especialidad, matricula } = req.body;

//   if (!nombre || !apellido || !especialidad || !matricula) {
//     return res.status(400).json({mensaje:'Faltan datos obligatorios'})
//   }

//   const sql = 'INSERT INTO profesionales (nombre, apellido,especialidad,matricula) VALUES (?,?,?,?)';

//   db.query(sql, [nombre, apellido, especialidad, matricula], (err, results) => {
//     if (err) {
//       console.error('Error al ingresar nuevo profesional');
//       return res.status(500).json({mensaje:'Error al ingresar nuevo profesional'})
//     }

//     res.status(201).json({
//       mensaje: 'Profesional creado',
//       id: results.insertId
//     })
//   })
// })

// app.get('/api/turnos', (req, res) => {
//   const sql = 'SELECT * FROM turnos WHERE fecha = CURDATE()';

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Error al obtener los turnos:', err);
//       return res.status(500).json({ mensaje: 'Error al obtener los turnos' });
//     }

//     res.status(200).json(results);
//   });
// });




app.listen(PORT, () => {
  console.log(`Backend corriendo en http:/localhost:${PORT}`)
})






















