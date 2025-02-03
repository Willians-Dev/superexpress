import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/user/UserTable";
import CreateUserForm from "../components/user/CreateUserForm"; // ✅ Asegurando la importación
import ChangePasswordForm from "../components/common/ChangePasswordForm.jsx";
import Notification from "../components/common/Notification";
import ConfirmationModal from "../components/ConfirmationModal"; // ✅ Modal de confirmación

const UserLayout = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingPasswordUser, setEditingPasswordUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null); // ✅ Estado para la confirmación
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    rol_id: "",
  });
  const [notification, setNotification] = useState({ message: "", type: "" });

  const navigate = useNavigate();

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Error al obtener usuarios");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/usuarios", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al guardar el usuario.");
      }

      setNotification({ message: "Usuario creado exitosamente.", type: "success" });
      setShowCreateForm(false);
      setNewUser({ nombre: "", apellido: "", correo: "", contrasena: "", rol_id: "" });
      fetchUsers();
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }
  };

  const handleEditUserSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${editingUser.usuario_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingUser),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al actualizar el usuario.");
      }

      setNotification({ message: "Usuario actualizado exitosamente.", type: "success" });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return; // No continuar si no hay usuario seleccionado

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${userToDelete.usuario_id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al eliminar el usuario.");
      }

      setNotification({ message: "Usuario eliminado exitosamente.", type: "success" });
      fetchUsers();
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    } finally {
      setUserToDelete(null); // Cerrar modal después de eliminar
    }
  };

  const handlePasswordSubmit = async ({ currentPassword, newPassword, userId }) => {
    const token = localStorage.getItem("token");

    const isAdminChangingPassword = !currentPassword; // Si no hay contraseña actual, es un admin

    try {
      const response = await fetch(`http://localhost:5000/api/usuarios/${userId}/cambiar-password`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isAdminChangingPassword
            ? { nuevaContrasena: newPassword } // Solo para admins
            : { contrasenaActual: currentPassword, nuevaContrasena: newPassword } // Para usuario normal
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al cambiar la contraseña.");
      }

      setNotification({ message: "Contraseña cambiada con éxito.", type: "success" });
      setEditingPasswordUser(null);
      navigate("/usuarios");
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>

      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      {!showCreateForm && !editingUser && (
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
          Crear Usuario
        </button>
      )}

      {showCreateForm && (
        <CreateUserForm
          newUser={newUser}
          setNewUser={setNewUser}
          roles={[{ rol_id: 1, rol_nombre: "Administrador" }, { rol_id: 2, rol_nombre: "Usuario" }]}
          handleCreateUser={handleCreateUser}
        >
          <button
            type="button"
            onClick={() => setShowCreateForm(false)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </CreateUserForm>
      )}

      {editingUser && (
        <CreateUserForm
          newUser={editingUser}
          setNewUser={setEditingUser}
          roles={[{ rol_id: 1, rol_nombre: "Administrador" }, { rol_id: 2, rol_nombre: "Usuario" }]}
          handleCreateUser={handleEditUserSubmit}
        >
          <button
            type="button"
            onClick={() => setEditingUser(null)}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </CreateUserForm>
      )}

      {!showCreateForm && !editingUser && !editingPasswordUser && (
        <UserTable
          users={users}
          onDelete={(user) => setUserToDelete(user)} // ✅ Mostrar confirmación antes de eliminar
          onEdit={(user) => setEditingUser(user)}
          onEditPassword={(user) => setEditingPasswordUser(user)}
        />
      )}

      {editingPasswordUser && (
        <ChangePasswordForm
          onSubmit={(data) => handlePasswordSubmit({ ...data, userId: editingPasswordUser.usuario_id })}
          showCurrentPassword={false}
          onCancel={() => setEditingPasswordUser(null)}
        />
      )}

      {/* ✅ Modal de confirmación para eliminar */}
      <ConfirmationModal
        show={!!userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteUser}
        message={`¿Estás seguro de que deseas eliminar a ${userToDelete?.nombre} ${userToDelete?.apellido}?`}
      />
    </div>
  );
};

export default UserLayout;