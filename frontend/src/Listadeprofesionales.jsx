import { useObtenerDB } from "./customHooks/useObtenerDB";

export const Listadeprofesionales = () => {
  const { datos } = useObtenerDB();

  return (
    <div className="flex flex-col justify-center gap-12">
      <h1 className="text-slate-900 text-center uppercase font-bold text-4xl">Seleccioná el profesional</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {datos.map((prof) => (
          <div
            key={prof.id}
            className="p-8 shadow rounded-lg bg-white cursor-pointer hover:scale-105"
          >
            <h2 className="text-xl font-bold text-slate-900">
              {prof.apellido}, {prof.nombre}
            </h2>
            <p className="text-slate-500">{prof.especialidad}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
