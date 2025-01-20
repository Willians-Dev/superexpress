import React from "react";

const CreateUserForm = ({ newUser, setNewUser, roles, handleCreateUser, children }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateUser();
      }}
      className="space-y-4 bg-white p-6 rounded shadow-md"
    >
      <h2 className="text-xl font-bold">Crear Usuario</h2>
      <div>
        <label className="block text-sm font-bold mb-2">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={newUser.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Apellido</label>
        <input
          type="text"
          name="apellido"
          value={newUser.apellido}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Correo</label>
        <input
          type="email"
          name="correo"
          value={newUser.correo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Contraseña</label>
        <input
          type="password"
          name="contrasena"
          value={newUser.contrasena}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-bold mb-2">Rol</label>
        <select
          name="rol_id"
          value={newUser.rol_id}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Seleccione un rol</option>
          {roles.map((rol) => (
            <option key={rol.rol_id} value={rol.rol_id}>
              {rol.rol_nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end space-x-2">
        {children}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;