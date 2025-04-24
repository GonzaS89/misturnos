import React, { useState, useEffect } from 'react';

const Turnos = () => {
  const [turnos, setTurnos] = useState([]);
  
  useEffect(() => {
    // Obtener los turnos del backend
    fetch('http://localhost:3001/api/turnos')
      .then(response => response.json())
      .then(data => setTurnos(data))
      .catch(error => console.error('Error al obtener los turnos:', error));
  }, []);
  
  return (
    <div>
      <h2>Selecciona tu turno</h2>
      <select>
        <option value="">Seleccione un turno</option>
        {turnos.map(turno => (
          <option 
            key={turno.id} 
            value={turno.id} 
            disabled={turno.estado === 'reservado'}
          >
            {new Date(turno.fecha).toLocaleDateString('es-AR')} - {turno.hora}

            {turno.estado === 'reservado' && 'disponible'}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Turnos;
