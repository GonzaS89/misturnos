import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/api/turnos";  // La URL siempre es la misma para "turnos"

export const useObtenerTurnos = (dni, submit) => {  // dni y submit como parámetros

  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (submit) {  // Solo hacer la consulta si se hace submit
      if (!dni) {
        setError("El DNI es obligatorio");
        return;
      }

      const obtenerDatos = async () => {
        try {
          setError(null);  // Limpiar el error si hay un DNI
          const url = `${API_URL}?dni=${dni}`;
          const response = await axios.get(url);
          setDatos(response.data)
          console.log(datos);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
          setError("Error al obtener los turnos");
        }
      };

      obtenerDatos();
    }
  }, [dni, submit]);  // Solo depende del dni y el submit para hacer la nueva consulta

  return { datos, error };
};
