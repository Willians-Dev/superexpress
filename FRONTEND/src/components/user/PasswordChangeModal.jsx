//FRONTEND\src\components\user\PasswordChangeModal.jsx
import React from 'react';

const PasswordChangeModal = ({ user, password, setPassword, handleChangePassword, onClose }) => (
  <div className="modal">
    <h3>Cambiar Contraseña para {user?.nombre}</h3>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Nueva Contraseña"
    />
    <button onClick={handleChangePassword}>Guardar</button>
    <button onClick={onClose}>Cancelar</button>
  </div>
);

export default PasswordChangeModal;