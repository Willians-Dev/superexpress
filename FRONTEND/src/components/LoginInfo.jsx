import React from 'react';

const LoginInfo = () => {
  return (
    <aside className="relative hidden lg:block lg:col-span-5 xl:col-span-6">
      <img
        alt="background"
        src="/login.jpg" // Cambia la ruta a la imagen ubicada en 'FRONTEND/public'
        className="absolute inset-0 h-full w-full object-cover"
      />
    </aside>
  );
};

export default LoginInfo;