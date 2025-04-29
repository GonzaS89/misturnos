// import React from 'react';

// export const Turnos = () => {
//   return (
//     <div>Turnos</div>
//   )
// }



import React, { useState } from "react";
import { useObtenerTurnos }  from "./customHooks/useObtenerTurnos";  // Asegurate de importar el hook

const Turnos = () => {
  const [dni, setDni] = useState('');
  const [submit, setSubmit] = useState(false);  // Estado para controlar el submit
  const { datos, error } = useObtenerTurnos(dni, submit);  // Llamamos solo con el dni y submit

  const formatearFecha = (fechaISO) => {
    return new Date(fechaISO).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDniChange = (e) => {
    setDni(e.target.value);  // Actualizamos el DNI cuando el usuario lo escribe
  };

  const handleSubmit = (e) => {
    e.preventDefault();  // Prevenir el comportamiento por defecto del formulario
    setSubmit(true); // Establecer el submit como true para realizar la consulta
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={dni}
          onChange={handleDniChange}
          placeholder="Buscar por DNI"
        />
        <button type="submit">Buscar</button>  {/* Botón submit */}
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}  {/* Muestra el mensaje de error si no se pasa DNI */}
      <ul>
        {datos.length > 0 ? (
          datos.map((turno) => (
            <li key={turno.dni}>{turno.paciente} - {formatearFecha(turno.fecha)}</li>
          ))
        ) : (
          <li>No se encontraron turnos</li>
        )}
      </ul>
    </div>
  );
};

export default Turnos;
