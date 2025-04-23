import React, { useState, useEffect } from "react";
import { useObtenerDB } from "./customHooks/useObtenerDB";

export const Listadeprofesionales = () => {

    const { datos } = useObtenerDB()

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {datos.map((prof) => (
        <div key={prof.id} className="p-8 shadow rounded-lg bg-white cursor-pointer hover:scale-105">
          <h2 className="text-xl font-bold">{prof.apellido}, {prof.nombre}</h2>
          <p>{prof.especialidad}</p>
          {/* Agregá más campos si querés */}
        </div>
      ))}
    </div>
  )
};
