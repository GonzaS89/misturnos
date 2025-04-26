import express from "express";
import cors from "cors";
import db from "./db.js"; // Importa la conexión a la base de datos

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Middleware para procesar JSON en el body de las peticiones

app.get('/api/profesionales', async (req, res) => {
  try{
    const [results] = await db.execute('SELECT * FROM profesionales');
    res.json(results);
  }catch(error){
    console.error('Error al obtener los profesionales', err);
    res.status(500).send('Error al obtener los profesionales');
  }
})


app.get("/api/obrasociales", async (req, res) => {
  try {
    // Usamos await para esperar el resultado de la consulta
    const [results] = await db.execute("SELECT * FROM obrasociales");
    res.json(results); // Devolvemos los resultados en formato JSON
  } catch (err) {
    console.error("Error al obtener las obras sociales:", err);
    res.status(500).send("Error al obtener las obras sociales");
  }
});


app.get("/api/turnos",async (req,res) => {
  try {
    const [results] = await db.execute("SELECT * FROM turnos");
    res.json(results);
  } catch (err) {
    console.error("Error al obtener los turnos:", err);
    res.status(500).send("Error al obtener los turnos");
  }
})

app.put("/api/turnos/:turno_id", async (req, res) => {
  const { paciente_nombre, dni, obrasocial_id } = req.body;
  const { turno_id } = req.params;  // Obtenemos el turno_id de los parámetros de la ruta

  try {
    const [resultado] = await db.execute(
      `UPDATE turnos
       SET paciente_nombre = ?, dni = ?, obrasocial_id = ?, estado = 'reservado'
       WHERE id = ?`,
      [paciente_nombre, dni, obrasocial_id, turno_id]
    );

    if (resultado.affectedRows > 0) {
      res.json({ mensaje: "Turno reservado correctamente" });
    } else {
      res.status(404).json({ error: "Turno no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar turno:", error);
    res.status(500).json({ error: "Error al reservar turno" });
  }
});








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
  console.log(`Backend corriendo en http:/localhost:${PORT}`);
});
