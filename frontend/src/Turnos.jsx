import React, { useState } from 'react';
import { useObtenerTurnos } from './customHooks/useObtenerTurnos';


export const Turnos = () => {


  const [dni, setDni] = useState('');
  const [submit, setSubmit] = useState(false);

  const {datos : turnos , error} = useObtenerTurnos(dni,submit)

  const manejarCambio = e => {
    setDni(e.target.value)
  }

  const manejarSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  }
  return (
    <div 
    className='w-full flex flex-col items-center gap-8'>
      <h2 
      className='uppercase text-2xl font-bold'>
        Consulta de turnos
        </h2>
      <form 
      className='flex gap-2'
      onSubmit={manejarSubmit}>
        <input 
        type="text" 
        placeholder='Numero de dni' 
        className='p-2 bg-slate-700 text-slate-50'
        value={dni}
        onChange={manejarCambio}/>
        <button 
        type='submit' 
        className='p-2 bg-slate-700 text-slate-50 uppercase rounded-none'>
          Consultar
          </button>
      </form>
      <div>
        {turnos.length > 0 && (
          turnos.map((turno) => (
            <p key={turno.id}>{turno.paciente}</p>
          ))
        )}
      </div>
    </div>
  )
}























// import React, { useState } from "react";
// import { useObtenerTurnos }  from "./customHooks/useObtenerTurnos";  // Asegurate de importar el hook

// export const Turnos = () => {
//   const [dni, setDni] = useState('');
//   const [submit, setSubmit] = useState(false);  // Estado para controlar el submit
//   const { datos, error } = useObtenerTurnos(dni, submit);  // Llamamos solo con el dni y submit

//   const formatearFecha = (fechaISO) => {
//     return new Date(fechaISO).toLocaleDateString("es-AR", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };

//   const handleDniChange = (e) => {
//     setDni(e.target.value);  // Actualizamos el DNI cuando el usuario lo escribe
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();  // Prevenir el comportamiento por defecto del formulario
//     setSubmit(true); // Establecer el submit como true para realizar la consulta
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={dni}
//           onChange={handleDniChange}
//           placeholder="Buscar por DNI"
//         />
//         <button type="submit">Buscar</button>  {/* Botón submit */}
//       </form>
//       {error && <p style={{ color: "red" }}>{error}</p>}  {/* Muestra el mensaje de error si no se pasa DNI */}
//       <ul>
//         {datos.length > 0 ? (
//           datos.map((turno) => (
//             <li key={turno.id}>{turno.paciente} - {formatearFecha(turno.fecha)}</li>
//           ))
//         ) : (
//           <li>No se encontraron turnos</li>
//         )}
//       </ul>
//     </div>
//   );
// };

