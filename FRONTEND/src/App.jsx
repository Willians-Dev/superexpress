// FRONTEND/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Inicio from "./pages/Inicio";
import Usuarios from "./pages/Usuarios";
import Productos from "./pages/Productos";
import Profile from "./pages/Profile";
import Inventario from "./pages/Inventario"; // Nueva página de Inventario
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import Reportes from './pages/Reportes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/inicio" element={<PrivateRoute><Inicio /></PrivateRoute>} />
        <Route path="/usuarios" element={<PrivateRoute requiredRole={1}><Usuarios /></PrivateRoute>} />
        <Route path="/productos" element={<PrivateRoute><Productos /></PrivateRoute>} />
        <Route path="/inventario" element={<PrivateRoute><Inventario /></PrivateRoute>} /> {/* Nueva ruta */}
        <Route path="/reportes" element={<PrivateRoute><Reportes /></PrivateRoute>} />
        <Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/no-autorizado" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;