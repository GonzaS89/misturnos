import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/turnos/paciente';

export const useObtenerTurnos = (dni, submit) => {

  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    if(submit) {
      
      const obtenerDatos = async () => {
        try{
          const url = `${API_URL}?dni=${dni}`;
          const res = await axios.get(url);

          setDatos(res.data);
          console.log(res.data)

        }catch (error){
          console.log('Error al filtrar turno');
          setError('Error al filtrar turno');
        }
      }

      obtenerDatos();
    }

  },[dni,submit] );
  
  

  return { datos, error }
}

