import React from 'react';
import { Listadeprofesionales } from './Listadeprofesionales';
import { Formularioturno2 } from './Formularioturno2';

export const ContenedorMain = () => {
  return (
    <div className='relative flex items-center justify-center w-[1000px] h-[700px] overflow-hidden'>
      <Listadeprofesionales />
      <Formularioturno2 />
    </div>
  )
}
