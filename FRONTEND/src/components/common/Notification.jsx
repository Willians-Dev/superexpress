//FRONTEND\src\components\common\Notification.jsx
import React from "react";

const Notification = ({ type = "info", message, onClose }) => {
  const getClass = () => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800";
      case "error":
        return "bg-red-100 text-red-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className={`p-4 rounded-md ${getClass()} mb-4`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="text-lg font-bold ml-4 hover:text-gray-700"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;