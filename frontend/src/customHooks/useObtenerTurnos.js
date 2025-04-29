import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/turnos';

export const useObtenerTurnos = (dni, submit) => {

  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    if(submit){

      const obtenerDatos = async () => {

        try {
          setError(null);

          const url = dni ? `${API_URL}?dni=${dni}` : API_URL;

          const res = await axios.get(url);
          console.log(res.data)
          setDatos(res.data);
        }catch (error){
          console.error('Error al obtener turnos');
          setError('Error al obtener turnos')
        }

      }
      obtenerDatos();
    }

  },[dni, submit])

  return {datos , error}
}

