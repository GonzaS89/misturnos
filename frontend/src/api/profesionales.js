const API_URL = 'http://localhost:3001/api';

export const crearProfesional = async (datos) => {
    const res = await fetch(`${API_URL}/profesionales`, {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(datos)
    })

    if(!res.ok)throw new Error('Error al crear profesional');
    return res.json()
}
