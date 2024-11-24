import React from 'react';

const CreateUserForm = ({ newUser, setNewUser, roles, handleCreateUser }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      handleCreateUser();
    }}
    className="space-y-4"
  >
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        value={newUser.nombre}
        onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
        placeholder="Nombre"
        className="border rounded px-4 py-2 w-full"
        required
      />
      <input
        type="text"
        value={newUser.apellido}
        onChange={(e) => setNewUser({ ...newUser, apellido: e.target.value })}
        placeholder="Apellido"
        className="border rounded px-4 py-2 w-full"
        required
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <input
        type="email"
        value={newUser.correo}
        onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
        placeholder="Correo"
        className="border rounded px-4 py-2 w-full"
        required
      />
      <input
        type="password"
        value={newUser.contrasena}
        onChange={(e) => setNewUser({ ...newUser, contrasena: e.target.value })}
        placeholder="Contraseña"
        className="border rounded px-4 py-2 w-full"
        required
      />
    </div>
    <select
      value={newUser.rol_id}
      onChange={(e) => setNewUser({ ...newUser, rol_id: e.target.value })}
      className="border rounded px-4 py-2 w-full"
      required
    >
      <option value="">Seleccione un rol</option>
      {roles.map((rol) => (
        <option key={rol.rol_id} value={rol.rol_id}>
          {rol.rol_nombre}
        </option>
      ))}
    </select>
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Crear Usuario
    </button>
  </form>
);

export default CreateUserForm;