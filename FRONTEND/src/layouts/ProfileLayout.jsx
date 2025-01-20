import React, { useState } from "react";
import UserProfile from "../components/user/UserProfile";
import ChangePasswordForm from "../components/common/ChangePasswordForm.jsx";

const ProfileLayout = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handlePasswordChange = () => {
    setShowPasswordForm(true);
  };

  const handlePasswordSubmit = async ({ currentPassword, newPassword }) => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/usuarios/cambiar-password", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contrasenaActual: currentPassword,
        nuevaContrasena: newPassword,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error al cambiar la contraseña.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
      <div className="bg-white p-6 shadow-md rounded-md">
        <UserProfile onPasswordChange={handlePasswordChange} />
      </div>
      {showPasswordForm && (
        <div className="mt-6">
          <ChangePasswordForm
            onSubmit={handlePasswordSubmit}
            showCurrentPassword={true}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileLayout;