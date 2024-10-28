import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios'; // Importamos el nuevo componente Usuarios

// Ruta privada que requiere autenticación
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para la página de login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas protegidas por autenticación */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;