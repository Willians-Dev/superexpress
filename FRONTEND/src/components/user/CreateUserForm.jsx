import React from "react";

const CreateUserForm = ({ newUser, setNewUser, handleSubmit, roles }) => {
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="bg-white p-4 rounded shadow-md">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={newUser.nombre}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={newUser.apellido}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={newUser.correo}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña (Dejar en blanco para no cambiar)"
        value={newUser.contrasena || ""}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <select
        name="rol_id"
        value={newUser.rol_id}
        onChange={handleChange}
        required
        className="border p-2 w-full mb-2"
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
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
      >
        {newUser.usuario_id ? "Actualizar Usuario" : "Crear Usuario"}
      </button>
    </form>
  );
};

export default CreateUserForm;