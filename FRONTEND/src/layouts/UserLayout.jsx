import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/user/UserTable";
import CreateUserForm from "../components/user/CreateUserForm";
import ChangePasswordForm from "../components/common/ChangePasswordForm.jsx";
import Notification from "../components/common/Notification";
import ConfirmationModal from "../components/common/ConfirmationModal";

const UserLayout = () => {
  const [users, setUsers] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingPasswordUser, setEditingPasswordUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
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

  const handleDeleteUser = async () => {
    if (!userToDelete || !userToDelete.usuario_id) {
      setNotification({ message: "Error: Usuario no válido para eliminar.", type: "error" });
      setUserToDelete(null);
      return;
    }

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
      setUserToDelete(null);
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
          roles={[
            { rol_id: 1, rol_nombre: "Administrador" },
            { rol_id: 2, rol_nombre: "Usuario" },
          ]}
          handleCreateUser={() => {
            handleCreateUser();
            setShowCreateForm(false);
          }}
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
          roles={[
            { rol_id: 1, rol_nombre: "Administrador" },
            { rol_id: 2, rol_nombre: "Usuario" },
          ]}
          handleCreateUser={() => {
            handleEditUserSubmit();
            setEditingUser(null);
          }}
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
          onDelete={(user) => setUserToDelete(user)} 
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