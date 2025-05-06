import React, { useEffect, useState } from "react";
import { useObtenerDB } from "./customHooks/useObtenerDB";

export const Turnosdisponibles = ({ idProfesional }) => {

  const { datos: profesionales } = useObtenerDB("profesionales");
  const prof = profesionales.find((p) => p.id === idProfesional);

  return <div className="w-full h-full">
    {prof ? 
    ( <h1 className="text-2xl uppercase font-bold text-center">{prof.genero === 'M' ? 'Dr. ' : 'Dra. '}{prof.apellido}, {prof.nombre}</h1> ) : 
    ( <p></p> )}
  </div>;
};
