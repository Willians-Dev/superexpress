import React from 'react';

const ConfirmModal = ({ user, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Confirmar Cambios</h2>
        <p className="mb-6">
          ¿Estás seguro de que quieres guardar los cambios en el usuario <strong>{user.nombre} {user.apellido}</strong>?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
            onClick={onConfirm}
          >
            Aceptar
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;