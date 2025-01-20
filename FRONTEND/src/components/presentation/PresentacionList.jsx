//FRONTEND\src\components\presentation\PresentacionList.jsx
import React, { useState, useEffect } from 'react';
import PresentacionForm from './PresentacionForm';

const PresentacionList = () => {
  const [presentaciones, setPresentaciones] = useState([]);
  const [editingPresentacion, setEditingPresentacion] = useState(null); // Para almacenar la presentación en edición

  // Obtener presentaciones desde el backend
  const fetchPresentaciones = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/presentaciones', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Error al obtener presentaciones');

      const data = await response.json();
      setPresentaciones(data);
    } catch (error) {
      console.error('Error al obtener presentaciones:', error);
    }
  };

  // Agregar nueva presentación
  const handleAddPresentacion = async (newPresentacion) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/presentaciones', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPresentacion),
      });

      if (!response.ok) throw new Error('Error al agregar presentación');

      const addedPresentacion = await response.json();
      setPresentaciones((prev) => [...prev, addedPresentacion]);
    } catch (error) {
      console.error('Error al agregar presentación:', error);
    }
  };

  // Actualizar una presentación existente
  const handleUpdatePresentacion = async (updatedPresentacion) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/presentaciones/${updatedPresentacion.presentacion_id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPresentacion),
        }
      );

      if (!response.ok) throw new Error('Error al actualizar presentación');

      const updated = await response.json();
      setPresentaciones((prev) =>
        prev.map((p) =>
          p.presentacion_id === updated.presentacion_id ? updated : p
        )
      );
      setEditingPresentacion(null); // Salir del modo de edición
    } catch (error) {
      console.error('Error al actualizar presentación:', error);
    }
  };

  // Eliminar una presentación
  const handleDeletePresentacion = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/presentaciones/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error('Error al eliminar presentación');

      setPresentaciones((prev) => prev.filter((p) => p.presentacion_id !== id));
    } catch (error) {
      console.error('Error al eliminar presentación:', error);
    }
  };

  useEffect(() => {
    fetchPresentaciones();
  }, []);

  return (
    <div className="flex gap-6">
      <PresentacionForm
        onSubmit={editingPresentacion ? handleUpdatePresentacion : handleAddPresentacion}
        editingPresentacion={editingPresentacion}
        setEditingPresentacion={setEditingPresentacion}
      />
      <div className="flex-1 bg-white p-6 shadow-md rounded-md">
        <h2 className="text-lg font-bold mb-4">Lista de Presentaciones</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Nombre</th>
              <th className="px-4 py-2 border-b">Descripción</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {presentaciones.map((presentacion) => (
              <tr key={presentacion.presentacion_id}>
                <td className="border px-4 py-2">{presentacion.nombre}</td>
                <td className="border px-4 py-2">{presentacion.descripcion || 'Sin Descripción'}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => setEditingPresentacion(presentacion)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeletePresentacion(presentacion.presentacion_id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PresentacionList;