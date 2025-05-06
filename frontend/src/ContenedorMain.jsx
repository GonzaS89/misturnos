import React, { useState } from 'react';
import { Listadeprofesionales } from './Listadeprofesionales';
import { Formularioturno2 } from './Formularioturno2';
import { Turnosdisponibles } from './Turnosdisponibles';

export const ContenedorMain = () => {

  const [idProfesional, setIdProfesional] = useState();
  const [idSeteada, setIdSeteada] = useState(false)

  const obtenerIdProfesional = (id) => {
    setIdProfesional(id);
    setIdSeteada(false);
  }

  const setearId = val => {
    val && setIdSeteada(val)
    console.log(val)
  }

  return (
    <div className='relative flex items-center justify-center w-[800px] h-[700px] overflow-hidden'>
      <Listadeprofesionales idProfesional={obtenerIdProfesional} idSeteada={idSeteada}/>
      <Turnosdisponibles idProfesional={idProfesional}/>
      {/* <Formularioturno2 idProfesional={idProfesional} seteoId={setearId}/> */}
    </div>
  )
}
