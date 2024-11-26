import React, { useState, useEffect } from 'react';

const PresentacionForm = ({
  onSubmit,
  editingPresentacion = null,
  setEditingPresentacion,
}) => {
  const [presentacion, setPresentacion] = useState({
    nombre: '',
    descripcion: '',
  });

  useEffect(() => {
    if (editingPresentacion) {
      setPresentacion(editingPresentacion);
    } else {
      setPresentacion({ nombre: '', descripcion: '' });
    }
  }, [editingPresentacion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPresentacion({ ...presentacion, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(presentacion);
    setPresentacion({ nombre: '', descripcion: '' });
    if (setEditingPresentacion) setEditingPresentacion(null); // Salir del modo de edición
  };

  const handleCancel = () => {
    setPresentacion({ nombre: '', descripcion: '' });
    if (setEditingPresentacion) setEditingPresentacion(null);
  };

  return (
    <div className="w-1/3 bg-white p-6 shadow-md rounded-md border">
      <h2 className="text-lg font-bold mb-4">
        {editingPresentacion ? 'Editar Presentación' : 'Agregar Presentación'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={presentacion.nombre}
          onChange={handleChange}
          placeholder="Nombre (ej: 1L, 500ml)"
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <textarea
          name="descripcion"
          value={presentacion.descripcion}
          onChange={handleChange}
          placeholder="Descripción (opcional)"
          className="w-full border border-gray-300 rounded px-4 py-2"
        ></textarea>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingPresentacion ? 'Actualizar' : 'Guardar'}
          </button>
          {editingPresentacion && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PresentacionForm;