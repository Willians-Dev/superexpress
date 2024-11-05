// FRONTEND/src/layouts/LoginLayout.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginInfo from '../components/LoginInfo';  // Verifica la ruta correcta
import LoginRegister from '../components/LoginRegister';  // Verifica la ruta correcta

const LoginLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="flex-grow flex items-center justify-center bg-white">
        <div className="lg:grid lg:grid-cols-12 lg:w-full">
          <div className="lg:col-span-5 xl:col-span-6">
            <LoginInfo />
          </div>
          <div className="lg:col-span-7 xl:col-span-6 flex items-center justify-center">
            <LoginRegister />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LoginLayout;