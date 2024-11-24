import React, { useState } from 'react';

const CreateUserForm = ({ newUser, setNewUser, roles, handleCreateUser }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newUser.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!newUser.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio';
    if (!newUser.correo.trim() || !/\S+@\S+\.\S+/.test(newUser.correo))
      newErrors.correo = 'Debe ser un correo válido';
    if (!newUser.contrasena.trim()) newErrors.contrasena = 'La contraseña es obligatoria';
    if (!newUser.rol_id) newErrors.rol_id = 'Debe seleccionar un rol';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleCreateUser();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            value={newUser.nombre}
            onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
            placeholder="Nombre"
            className="border rounded px-4 py-2 w-full"
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
        </div>
        <div>
          <input
            type="text"
            value={newUser.apellido}
            onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
            placeholder="Apellido"
            className="border rounded px-4 py-2 w-full"
          />
          {errors.apellido && <p className="text-red-500 text-sm">{errors.apellido}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="email"
            value={newUser.correo}
            onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
            placeholder="Correo"
            className="border rounded px-4 py-2 w-full"
          />
          {errors.correo && <p className="text-red-500 text-sm">{errors.correo}</p>}
        </div>
        <div>
          <input
            type="password"
            value={newUser.contrasena}
            onChange={(e) => setNewUser({ ...newUser, contrasena: e.target.value })}
            placeholder="Contraseña"
            className="border rounded px-4 py-2 w-full"
          />
          {errors.contrasena && <p className="text-red-500 text-sm">{errors.contrasena}</p>}
        </div>
      </div>
      <div>
        <select
          value={newUser.rol_id}
          onChange={(e) => setNewUser({ ...newUser, rol_id: e.target.value })}
          className="border rounded px-4 py-2 w-full"
        >
          <option value="">Seleccione un rol</option>
          {roles.map((rol) => (
            <option key={rol.rol_id} value={rol.rol_id}>
              {rol.rol_nombre}
            </option>
          ))}
        </select>
        {errors.rol_id && <p className="text-red-500 text-sm">{errors.rol_id}</p>}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Crear Usuario
      </button>
    </form>
  );
};

export default CreateUserForm;