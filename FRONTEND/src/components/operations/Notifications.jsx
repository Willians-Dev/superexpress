import React from "react";

const Notifications = ({ alerts }) => {
  return (
    <div className="lg:col-span-6 bg-white shadow-md rounded-md p-6">
      <h2 className="text-xl font-bold mb-4">Notificaciones</h2>
      {alerts.length === 0 ? (
        <p className="text-gray-500">No hay notificaciones.</p>
      ) : (
        <ul className="list-disc pl-5 text-red-600">
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications; // ✅ Asegurar la exportación por defecto