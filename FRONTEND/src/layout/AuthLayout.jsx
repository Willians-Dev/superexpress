import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;