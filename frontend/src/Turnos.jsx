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
    <div className="w-full flex flex-col items-center gap-8">
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
        />
        <button
          type="submit"
          className="p-2 bg-slate-700 text-slate-50 uppercase rounded-none"
        >
          Consultar
        </button>
      </form>
      <div className="w-full flex justify-center">
        {dni === undefined ? 
        ( <p>Inserta un dni</p> ) :
        (<div className={`${submit ? 'flex flex-col gap-2' : 'hidden'}`}>
            <ul>
              {turnos.length > 0 &&
                turnos.map((turno) => (
                  <li className="gap-4 w-[600px] bg-slate-200">
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-center uppercase p-2 bg-blue-900 text-slate-50 font-bold w-full">
                        Turnos para {turno.paciente} - dni {turno.dni}
                      </p>
                      <div className="p-4 flex flex-col items-center justify-center">
                        <h2 className="text-xl font-bold uppercase">
                          {turno.medico}
                        </h2>
                        <p>{turno.especialidad}</p>
                      </div>
                      <p className="uppercase p-4 font-bold">
                        {formatearFechaISO(turno.fecha)}
                      </p>
                      <p className="uppercase p-4 font-bold">{turno.hora}</p>
                      <p className="uppercase p-4 font-bold">+
                        {turno.obrasocial}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
            <button onClick={() => formatearValores()} className="bg-blue-900 font-bold uppercase text-slate-50 rounded-none">Nueva consulta</button>
          </div>)
        }
      </div>
    </div>
  );
};
