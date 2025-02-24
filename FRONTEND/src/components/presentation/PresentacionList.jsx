import React, { useState, useEffect } from "react";
import PresentacionForm from "./PresentacionForm";
import Notification from "../common/Notification";
import ConfirmationModal from "../common/ConfirmationModal";

const PresentacionList = () => {
  const [presentaciones, setPresentaciones] = useState([]);
  const [editingPresentacion, setEditingPresentacion] = useState(null);
  const [presentacionToDelete, setPresentacionToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  // ✅ Obtener presentaciones desde el backend
  const fetchPresentaciones = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/presentaciones", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al obtener presentaciones");

      const data = await response.json();
      setPresentaciones(data);
    } catch (error) {
      setNotification({ message: "Error al obtener presentaciones.", type: "error" });
    }
  };

  useEffect(() => {
    fetchPresentaciones();
  }, []);

  // ✅ Guardar o actualizar presentación con notificación
  const handleSavePresentacion = async (presentacion) => {
    try {
      const token = localStorage.getItem("token");
      const method = presentacion.presentacion_id ? "PUT" : "POST";
      const url = presentacion.presentacion_id
        ? `http://localhost:5000/api/presentaciones/${presentacion.presentacion_id}`
        : "http://localhost:5000/api/presentaciones";
  
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(presentacion),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // ✅ Obtener texto en caso de error HTML
        console.error("Error del servidor:", errorText);
        throw new Error("Error al guardar presentación");
      }
  
      const data = await response.json();
      setNotification({ message: "Presentación actualizada con éxito.", type: "success" });
      setEditingPresentacion(null);
      fetchPresentaciones(); // ✅ Refrescar lista de presentaciones
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }
  };
 
  // ✅ Mostrar modal antes de eliminar
  const confirmDelete = (presentacion) => {
    setPresentacionToDelete(presentacion);
    setShowModal(true);
  };

  // ✅ Eliminar una presentación con notificación
  const handleDeletePresentacion = async () => {
    if (!presentacionToDelete || !presentacionToDelete.presentacion_id) {
      setNotification({ message: "Error: ID inválido.", type: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/presentaciones/${presentacionToDelete.presentacion_id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar presentación");
      }

      setPresentaciones((prev) =>
        prev.filter((p) => p.presentacion_id !== presentacionToDelete.presentacion_id)
      );

      setNotification({ message: "Presentación eliminada con éxito.", type: "success" });
      setShowModal(false);
      setPresentacionToDelete(null);
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Gestión de Presentaciones</h1>

      {/* ✅ Notificación de acciones */}
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}

      <div className="flex gap-6">
        <PresentacionForm
          onSubmit={handleSavePresentacion}
          editingPresentacion={editingPresentacion}
          setEditingPresentacion={setEditingPresentacion}
        />
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-lg font-bold mb-4">Lista de Presentaciones</h2>
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr className="text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Descripción</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {presentaciones.map((presentacion) => (
                <tr
                  key={presentacion.presentacion_id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {presentacion.nombre}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {presentacion.descripcion || "Sin Descripción"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => setEditingPresentacion(presentacion)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => confirmDelete(presentacion)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Modal de confirmación para eliminar presentación */}
      <ConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeletePresentacion}
        message={`¿Estás seguro de que deseas eliminar la presentación "${presentacionToDelete?.nombre}"?`}
      />
    </div>
  );
};

export default PresentacionList;