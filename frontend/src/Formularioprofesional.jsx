import { useState } from 'react';

function FormProfesional() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    matricula: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/profesionales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Profesional creado con ID: ${data.id}`);
        setFormData({
          nombre: '',
          apellido: '',
          especialidad: '',
          matricula: ''
        });
      } else {
        alert('Error: ' + data.mensaje);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-8">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="especialidad"
        placeholder="Especialidad"
        value={formData.especialidad}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="matricula"
        placeholder="Matrícula"
        value={formData.matricula}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        Agregar Profesional
      </button>
    </form>

  );
}

export default FormProfesional;
