import { useObtenerDB } from "./customHooks/useObtenerDB";
import { IoIosPerson } from "react-icons/io";

export const Listadeprofesionales = ({ idProfesional }) => {
  const { datos: profesionales } = useObtenerDB("profesionales");

  return (
    <div className="flex flex-col justify-center gap-6 mt-20 absolute z-20">
      <h1 className="text-slate-900 text-center uppercase font-bold text-2xl">
        Seleccioná el profesional
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profesionales.map((prof) => (
          <div
            className="flex justify-between items-center p-6 shadow rounded-lg bg-white cursor-pointer hover:scale-105 h-full"
            onClick={() => idProfesional(prof.id)}
          >
            <div key={prof.id} className="flex flex-col basis-3/4">
              <h2 className="text-lg font-bold text-slate-900">
                {prof.apellido}, {prof.nombre}
              </h2>
              <p className="text-slate-500 text-sm">{prof.especialidad}</p>
            </div>
            {prof.foto ? (
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
