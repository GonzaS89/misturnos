import { useState } from 'react';
import { crearProfesional } from './api/profesionales';

function FormularioProfesional() {
  const [form, setForm] = useState({
    nombre: '',
    especialidad: '',
    telefono: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await crearProfesional(form);
      setMensaje(`✅ Profesional creado con ID: ${res.id}`);
      setForm({ nombre: '', especialidad: '', telefono: '' });
    } catch (err) {
      console.error(err);
      setMensaje('❌ Error al crear profesional');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded space-y-4">
      <h2 className="text-xl font-bold">Nuevo Profesional</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="border p-2 w-full"
        />
        <input
          name="especialidad"
          value={form.especialidad}
          onChange={handleChange}
          placeholder="Especialidad"
          required
          className="border p-2 w-full"
        />
        <input
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default FormularioProfesional;
