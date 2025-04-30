import express from "express";
import cors from "cors";
import db from "./db.js"; // Importa la conexión a la base de datos

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Middleware para procesar JSON en el body de las peticiones

app.get("/api/profesionales", async (req, res) => {
  try {
    const [resultado] = await db.execute("SELECT * FROM profesionales");
    res.json(resultado);
  } catch {
    console.error("Error al obtener los profesionales");
    res.status(500).send("Error al obtener los profesionales");
  }
});

app.get("/api/obrasociales", async (req, res) => {
  try {
    const [resultado] = await db.execute("SELECT * FROM obrasociales");
    res.json(resultado);
  } catch {
    console.error("Error en obtener obrasociales");
    res.status(500).send("Error en obtener obrasociales");
  }
});

app.get("/api/turnos/paciente", async (req, res) => {
  const { dni } = req.query;// Capturás el dni de la URL si viene

  try {
    let query;

    query =
      "SELECT t.id AS id, CONCAT(p.apellido, ', ', p.nombre) AS medico, p.especialidad AS especialidad, t.paciente_nombre AS paciente, t.dni AS dni, o.nombre AS obrasocial, t.fecha AS fecha, t.hora AS hora FROM turnos t JOIN profesionales p ON t.profesional_id = p.id JOIN obrasociales o ON t.obrasocial_id = o.id WHERE dni = ?";

    const [resultado] = await db.execute(query, [dni]);
    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener los turnos:", error);
    res.status(500).json({ error: "Error al obtener los turnos" });
  }
});

app.get("/api/turnos", async (req, res) => {
  try{
    const [resultado] = await db.execute("SELECT * FROM turnos");
    res.json(resultado);
  }catch(error){
    console.error('Error al obtener turnos');
    res.status(500).send('Error al obtener turnos')
  }
})

app.put("/api/turnos/:turno_id", async (req, res) => {
  const { paciente_nombre, dni, obrasocial_id } = req.body;
  const { turno_id } = req.params; // Obtenemos el turno_id de los parámetros de la ruta

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

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
