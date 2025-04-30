import React, { useState } from "react";
import { useObtenerTurnos } from "./customHooks/useObtenerTurnos";

export const Turnos = () => {
  const [dni, setDni] = useState("");
  const [submit, setSubmit] = useState(false);

  const { datos: turnos, error } = useObtenerTurnos(dni, submit);

  const manejarCambio = (e) => {
    setDni(e.target.value);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);

  };

  function formatearFechaISO(fechaISO) {
    const fecha = new Date(fechaISO);

    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // ¡Los meses van de 0 a 11!
    const anio = fecha.getFullYear();

    return `${dia}-${mes}-${anio}`;
  }

  const formatearValores = () => {
    setSubmit(false);
    setDni("");
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center gap-8">
        <h2 className="uppercase text-2xl font-bold text-slate-50">
          Consulta de turnos
        </h2>
        <form className="flex gap-2" onSubmit={manejarSubmit}>
          <input
            type="text"
            placeholder="Numero de dni"
            className="p-2 bg-slate-700 text-slate-50"
            value={dni}
            onChange={manejarCambio}
            required
          />
          <button
            type="submit"
            className="p-2 bg-slate-700 text-slate-50 uppercase rounded-none"
          >
            Consultar
          </button>
        </form>
      </div>

      <div className="w-full flex justify-center">
        {turnos.length > 0 ?
          turnos.map((turno) => (
            <div className={`${dni && submit ? 'flex flex-col gap-8' : 'hidden'}`}>
              <ul>
                <li className="gap-2 w-[600px] my-8">
            
                  <div className="datos-turno flex flex-col justify-center items-center bg-slate-200 w-full">
                  <div className="flex items-center justify-between w-full p-4">
                      <p className="uppercase font-bold text-lg">Paciente</p>
                      <p>{turno.paciente}</p>
                    </div>
                    <div className="flex items-center justify-between w-full p-4">
                      <p className="uppercase font-bold text-lg">Dni</p>
                      <p>{turno.dni}</p>
                    </div>
                    <div className="flex items-center justify-between w-full p-4">
                      <p className="uppercase font-bold text-lg">Profesional</p>
                      <p><span className="uppercase">{turno.medico}</span> ({turno.especialidad})</p>
                    </div>
                    <div className="flex items-center justify-between w-full p-4">
                      <p className="uppercase font-bold text-lg">Fecha</p>
                      <p>{formatearFechaISO(turno.fecha)}</p>
                    </div>
                    <div className="flex items-center justify-between w-full p-4">
                      <p className="uppercase font-bold text-lg">Hora</p>
                      <p>{turno.hora}</p>
                    </div>
                    <div className="flex items-center justify-between w-full p-4">
                      <p className="uppercase font-bold text-lg">Obra social</p>
                      <p className="uppercase">{turno.obrasocial}</p>
                    </div>
                  </div>
                </li>
              </ul>
              <button onClick={() => formatearValores()} className="bg-blue-900 font-bold uppercase text-slate-50 rounded-none w-full p-4 text-xl">Nueva consulta</button>
            </div>
          )):  <p>No se registran turno para este dni</p> }
      </div>
    </div>
  );
};
