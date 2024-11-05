// FRONTEND/src/components/LoginRegister.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Debe ingresar credenciales válidas');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="max-w-xl lg:max-w-3xl w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Inicio de sesión</h2>
      <form className="grid grid-cols-6 gap-6">
        <div className="col-span-6">
          <label htmlFor="Email" className="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            type="email"
            id="Email"
            name="email"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-4 py-2"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="Password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            id="Password"
            name="password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm px-4 py-2"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="col-span-6 text-red-500 text-sm mt-2">{error}</p>}

        <div className="col-span-6">
          <button
            type="button"
            onClick={handleLogin}
            className="w-full inline-block shrink-0 rounded-md border border-[#2C35E0FF] bg-[#2C35E0FF] px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-[#2C35E0FF] focus:outline-none focus:ring active:text-blue-500"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
      <div className="mt-2 text-center">
        <Link to="/recuperar-password" className="text-sm text-[#2C35E0FF] hover:underline">¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
};

export default LoginRegister;