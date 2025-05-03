import React, { useState } from 'react';
import { Listadeprofesionales } from './Listadeprofesionales';
import { Formularioturno2 } from './Formularioturno2';

export const ContenedorMain = () => {

  const [idProfesional, setIdProfesional] = useState();

  const obtenerIdProfesional = (id) => {
    setIdProfesional(id);
  }

  return (
    <div className='relative flex items-center justify-center w-[800px] h-[700px] overflow-hidden'>
      <Listadeprofesionales idProfesional={obtenerIdProfesional}/>
      <Formularioturno2 idProfesional={idProfesional}/>
    </div>
  )
}
