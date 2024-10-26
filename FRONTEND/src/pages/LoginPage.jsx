import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import AuthLayout from '../layout/AuthLayout';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo: email, contrasena: password }),
      });

      const data = await response.json();
      console.log('Respuesta del backend:', data); // Verificar el token en consola
      
      if (response.ok) {
        // Almacenar el token JWT en localStorage
        localStorage.setItem('token', data.token); // Almacena el token en localStorage
        console.log('Token JWT almacenado:', data.token); // Verifica que el token se almacenó correctamente
        navigate('/dashboard'); // Redirigir al dashboard
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Inicio de sesión</h2>
      <Input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />
      <Input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={error}
      />
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <Button text="Iniciar Sesión" onClick={handleLogin} />
    </AuthLayout>
  );
};

export default LoginPage;