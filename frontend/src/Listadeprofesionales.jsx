import { useEffect, useState } from "react";
import { useObtenerDB } from "./customHooks/useObtenerDB";
import { IoIosPerson } from "react-icons/io";

export const Listadeprofesionales = ({ idProfesional, idSeteada }) => {
  const { datos: profesionales } = useObtenerDB("profesionales");
  const [idProfesionalLocal, setIdProfesionalLocal] = useState(null);

  useEffect(() => {
    idProfesional(idProfesionalLocal);
  }, [idProfesionalLocal,idProfesional]);

  useEffect(() => {
    idSeteada && setIdProfesionalLocal(null);
  },[idSeteada])

  return (
    <div
      className={`listaProfesionales overflow-scroll flex flex-col gap-6 mt-36 absolute z-20 ${
        idProfesionalLocal ? "left-full" : ""
      }`}
    >
      <h1 className="text-slate-900 text-center uppercase font-bold text-2xl">
        Seleccioná el profesional
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profesionales.map((prof) => (
          <div
          key={prof.id}
            className="flex justify-between items-center p-6 shadow rounded-lg bg-white cursor-pointer hover:scale-105 h-full"
            onClick={() => setIdProfesionalLocal(prof.id)}
          >
            <div key={prof.id} className="flex flex-col basis-3/4">
              <h2 className="text-lg font-bold text-slate-900">
                {prof.apellido}, {prof.nombre}
              </h2>
              <p className="text-slate-500 text-sm">{prof.especialidad}</p>
            </div>
            {prof.dni ? (
              <img src={prof.foto} alt="" className="h-[80px] w-[80px]" />
            ) : (
              <IoIosPerson className="text-5xl" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
