import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const useObtenerObrasociales = () => {

  const [obrasociales, setObrasociales] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await axios.get(`${API_URL}/obrasociales`);
        setObrasociales(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  return { obrasociales }
}