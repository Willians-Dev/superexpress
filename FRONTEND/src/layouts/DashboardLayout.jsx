import Sidebar from "../components/Sidebar"; // Asegúrate de la ruta correcta
import PropTypes from "prop-types";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Sidebar en el lado izquierdo */}
        <Sidebar />

        {/* Contenido principal */}
        <div className="flex-grow p-4 bg-gray-100">{children}</div>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
