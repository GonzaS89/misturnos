import express from 'express';
import db from './db.js';

const router = express.Router();

// ✅ Tablas permitidas para el GET
const tablasPermitidas = ['clientes', 'productos'];

// 🟢 GET dinámico por tabla (ya lo tenías)
router.get('/:tabla', (req, res) => {
  const tabla = req.params.tabla;

  if (!tablasPermitidas.includes(tabla)) {
    return res.status(400).json({ error: 'Tabla inválida' });
  }

  db.query(`SELECT * FROM ${tabla}`, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// 🆕 POST para agregar producto
router.post('/productos', (req, res) => {
  const { nombre, precio, descripcion } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Faltan datos del producto' });
  }

  const query = 'INSERT INTO productos (nombre, precio, descripcion) VALUES (?, ?, ?)';
  db.query(query, [nombre, precio, descripcion], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ mensaje: 'Producto agregado con éxito', id: result.insertId });
  });
});

export default router;

