// FRONTEND/src/components/LoginInfo.jsx
import React from 'react';

const LoginInfo = () => {
  return (
    <aside className="relative hidden lg:block lg:col-span-5 xl:col-span-6 p-4">
      {/* Título arriba */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-blue-800 sm:text-4xl md:text-5xl">
          Bienvenido a SuperExpress
        </h2>
      </div>

      {/* Imagen debajo del título */}
      <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
        <img
          alt="background"
          src="/login.jpg"  // Asegúrate de que esta ruta sea correcta y que la imagen esté en la carpeta public
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
    </aside>
  );
};

export default LoginInfo;