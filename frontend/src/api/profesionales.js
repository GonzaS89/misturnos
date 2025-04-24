import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const crearProfesional = async (datos) => {
    const res = await axios.post(`${API_URL}/profesionales`, datos);
    return res.data; 
  };
  
