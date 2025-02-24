import React from "react";

const Notifications = ({ alerts }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-300">
      <h2 className="text-2xl font-semibold text-gray-700 flex items-center gap-2 mb-4">
        🔔 Notificaciones
      </h2>

      {alerts.length === 0 ? (
        <p className="text-gray-500 text-lg italic">No hay notificaciones.</p>
      ) : (
        <ul className="space-y-3">
          {alerts.map((alert, index) => (
            <li key={index} className="flex items-center gap-3 bg-red-100 border-l-4 border-red-500 text-red-800 p-4 rounded-lg shadow-md text-lg font-medium">
              ⚠️ <span className="break-words">{alert}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
