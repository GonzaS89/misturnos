import React, { useState, useEffect } from "react";
import { useObtenerDB } from "./customHooks/useObtenerDB";

export const Formularioturno = () => {
  const { datos: obrasociales } = useObtenerDB("obrasociales");
  const { datos: turnos } = useObtenerDB("turnos");

  const formatearFecha = (fechaISO) => {
    return new Date(fechaISO).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const [formData, setFormData] = useState({
    paciente_nombre: "",
    dni: "",
    obrasocial_id: "",
    turno_id: "",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/turnos/reservar", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paciente_nombre: formData.paciente_nombre,
          dni: formData.dni,
          obrasocial_id: formData.obrasocial_id,
          turno_id: formData.turno_id,
        }),
      });

      const resultText = await response.text(); // Primero leemos el texto
      const result = resultText ? JSON.parse(resultText) : {};

      if (!response.ok) {
        // Manejo de errores más claro
        const errorMessage = result.error || "Hubo un problema al realizar la solicitud.";
        console.error("Error al actualizar el turno:", result);
        alert("Error al reservar el turno: " + errorMessage);
        return;
      }

      // Si todo está ok
      console.log("Turno reservado correctamente", result);
      alert("Turno reservado correctamente");

    } catch (error) {
      console.error("Error al hacer la solicitud PUT", error);
      alert("Error al hacer la solicitud PUT");
    }
  };



  return (
    <div>
      <form onSubmit={manejarSubmit}
        className="flex flex-col gap-6 justify-center items-center"
      >
        <div className="flex flex-col gap-2 w-3/4">
          <input
            type="text"
            name="paciente_nombre"
            value={formData.nombre}
            onChange={manejarCambio}
            placeholder="Nombre y Apellido"
            className="w- p-2 border border-slate-300 bg-slate-100 text-slate-950 rounded-md shadow-md"
            required
          />
        </div>
        <div className="flex flex-col gap-2 w-3/4">
          <input
            type="text"
            name="dni"
            value={formData.dni}
            onChange={manejarCambio}

            placeholder="DNI"
            className="w- p-2 border border-slate-300 bg-slate-100 text-slate-950 rounded-md shadow-md"
            required
          />
        </div>
        <select
          name="obrasocial_id"
          value={formData.obrasocial_id}
          onChange={manejarCambio}
          id="obrasociales"
          className="w-3/4 p-2 border border-slate-300 bg-slate-100 text-slate-950 rounded-md shadow-md"
          required
        >
          <option value="" disabled>
            ELEGÍ TU OBRA SOCIAL
          </option>
          {obrasociales.map((obra) => (
            <option key={obra.nombre} value={obra.id}>
              {obra.nombre}
            </option>
          ))}
        </select>
        <select
          name="turno_id"
          value={formData.turno_id}
          onChange={manejarCambio}
          required
          className="w-3/4 p-2 border rounded bg-slate-100 text-slate-950"
        >
          <option value="">ELEGÍ TU TURNO</option>
          {turnos.map((turno) => (
            <option key={turno.id} value={turno.id}>
              {formatearFecha(turno.fecha)} - {turno.hora}
            </option>
          ))}
        </select>

        <button type="submit" className="uppercase w-3/4">
          confirmar turno
        </button>
      </form>
    </div>
  );
};
