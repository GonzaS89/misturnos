import React, { useEffect, useState } from "react";
import axios from "axios";
import { useObtenerDB } from "./customHooks/useObtenerDB";

export const Formularioturno2 = ({ idProfesional, seteoId }) => {
  const { datos: obrasociales } = useObtenerDB("obrasociales");
  const { datos: turnos } = useObtenerDB("turnos");

  const [formData, setFormData] = useState({
    paciente_nombre: "",
    dni: "",
    obrasocial_id: "",
    turno_id: "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    try{
        const res = await axios.put(`http://localhost:3001/api/turnos/${formData.turno_id}`,
            {
                paciente_nombre: formData.paciente_nombre,
                dni: formData.dni,
                obrasocial_id:formData.obrasocial_id
            }
        )

        console.log('Turno reservado correctamente', res.data);
        alert('Turnos reservado correctamente');

        setFormData({
            paciente_nombre:"",
            dni:"",
            obrasocial_id:"",
            turno_id:""
        })
    }catch(err){
        console.error('Error al reservar turno');
        alert('Error al reservar turno')
    }
  };

  const formatearFecha = (fechaISO) => {
    return new Date(fechaISO).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const estiloform = 'p-4 rounded-md';

  const [idProf, setIdProf] = useState(null);

  useEffect(() => {
    setIdProf(idProfesional)
  },[idProfesional])

  const buttonBack = () => {
    seteoId(true);
    setIdProf(null)
  }

  return (
    <div className={`my-0 mx-auto absolute ${idProf ? '' : 'right-full'}`}>
      <form className="flex flex-col gap-4" onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Nombre y apellido"
          value={formData.paciente_nombre}
          name="paciente_nombre"
          onChange={manejarCambio}
          className={estiloform}
          required
        />
        <input
          type="text"
          placeholder="DNI"
          value={formData.dni}
          name="dni"
          onChange={manejarCambio}
          required
          className={estiloform}
        />
        <select
          name="obrasocial_id"
          id="obrasociales"
          value={formData.obrasocial_id}
          onChange={manejarCambio}
          className={estiloform}
          required
        >
          <option value="" disabled>
            Elegí tu obra social
          </option>
          {obrasociales.map((obrasocial) => (
            <option value={obrasocial.id} key={obrasocial.nombre}>
              {obrasocial.nombre}
            </option>
          ))}
        </select>
        <select
        name="turno_id"
        id="turnos"
        value={formData.turno_id}
        onChange={manejarCambio}
        className={estiloform}
        required>
            <option value="" disabled>Elegí un turno</option>
            {turnos.map((turno) => (
                <option value={turno.id} key={turno.id} disabled={turno.estado === 'reservado' ? true : false}>
                    {formatearFecha(turno.fecha)} - {turno.hora} - {(turno.estado).toUpperCase()}
                </option>
            ))}
        </select>
        <button type="submit" className="font-bold uppercase p-4">Reservar turno</button>
        
      </form>
      <button className="font-bold uppercase p-4" onClick={()=> buttonBack()}>Volver</button>
    </div>
  );
};

// import React, { useState } from "react";
// import axios from "axios";
// import { useObtenerDB } from "./customHooks/useObtenerDB";

// export const Formularioturno2 = () => {
//   const { datos: obrasociales } = useObtenerDB("obrasociales");
//   const { datos: turnos } = useObtenerDB("turnos");

//   const [formData, setFormData] = useState({
//     paciente_nombre: "",
//     dni: "",
//     obrasocial_id: "",
//     turno_id: "",
//   });

//   const formatearFecha = (fechaISO) => {
//     return new Date(fechaISO).toLocaleDateString("es-AR", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//   };

//   const manejarCambio = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const manejarSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Datos del formulario:", formData);

//     try{
//         const res = await axios.put(
//             `http://localhost:3001/api/turnos/${formData.turno_id}`,
//             {
//                 paciente_nombre: formData.paciente_nombre,
//                 dni: formData.dni,
//                 obrasocial_id:formData.obrasocial_id
//             });

//             console.log('Turno cargado correctamente', res.data);
//             alert('Turno reservado correctamente');

//             setFormData({
//                 paciente_nombre: "",
//                 dni: "",
//                 obrasocial_id:"",
//                 turno_id:""
//             })

//     }catch (error){
//         console.error('Error al hacer put');
//         alert('Error al hacer put')
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={manejarSubmit} className="flex flex-col gap-4 w-96">
//         <input
//           type="text"
//           placeholder="Nombre y apellido"
//           className="p-2 bg-slate-100 w-full"
//           name="paciente_nombre"
//           value={formData.paciente_nombre}
//           onChange={manejarCambio}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Inserte su dni"
//           className="p-2 bg-slate-100 w-full"
//           name="dni"
//           value={formData.dni}
//           onChange={manejarCambio}
//           required
//         />
//         <select
//           name="obrasocial_id"
//           className="p-2 bg-slate-100 w-full"
//           onChange={manejarCambio}
//           id="obrasociales"
//           value={formData.obrasocial_id}
//           required
//         >
//           <option value="" disabled>
//             Elegi tu obra social
//           </option>
//           {obrasociales.map((obra) => (
//             <option key={obra.nombre} value={obra.id}>
//               {obra.nombre}
//             </option>
//           ))}
//         </select>
//         <select
//           name="turno_id"
//           value={formData.turno_id}
//           onChange={manejarCambio}
//           className="p-2 bg-slate-100 w-full"
//           required
//         >
//           <option>Selecciona un turno</option>
//           {turnos.map((turno) => (
//             <option
//               key={turno.id}
//               value={turno.id}

//             >
//               {formatearFecha(turno.fecha)} - {turno.hora}
//             </option>
//           ))}
//         </select>
//         <button type="submit" className="rounded-none uppercase font-bold">
//           Reservar turno
//         </button>
//       </form>
//     </div>
//   );
// };
