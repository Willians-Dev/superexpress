//FRONTEND\src\App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Inicio from './pages/Inicio';
import Usuarios from './pages/Usuarios';
import Productos from './pages/Productos';
import Profile from './pages/Profile';
import Unauthorized from './pages/Unauthorized';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/inicio" element={<PrivateRoute requiredRole={[1, 2]}><Inicio /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute requiredRole={[1]}><Usuarios /></PrivateRoute>} />
        <Route path="/productos" element={<PrivateRoute><Productos /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/no-autorizado" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
