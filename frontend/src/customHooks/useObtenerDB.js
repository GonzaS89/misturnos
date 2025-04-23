import { useState, useEffect } from "react"

export const useObtenerDB = () => {
  const [datos, setDatos] = useState([])

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/profesionales')
        const data = await res.json()
        setDatos(data)
      } catch (err) {
        console.error("❌ Error al obtener datos:", err)
      }
    }

    obtenerDatos()
  }, [])

  return { datos }
}
