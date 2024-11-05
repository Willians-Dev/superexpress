import { Link } from "react-router-dom";
import { ButtonsInfo } from "../Types/ButtonsInfo";
import Image from "/logo-removebg.png";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white flex flex-col h-screen p-4">
      <div className="flex items-center mb-4">
        <img src={Image} alt="Logo" className="w-16 h-14 rounded-full" />
        <h2 className="text-xl font-bold">Panel de Control</h2>
      </div>

      {/* Enlaces del Sidebar */}
      <nav className="flex flex-col">
        {ButtonsInfo.map((button) => (
          <Link
            to={button.path}
            key={button.name}
            className="hover:bg-blue-700 px-4 py-2 rounded"
          >
            {button.name}
          </Link>
        ))}

        {/* <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/usuarios" className="hover:bg-blue-700 p-2 rounded">
          Gestión de Usuarios
        </Link>
        <Link to="/profile" className="hover:bg-blue-700 p-2 rounded">
          Perfil
        </Link>
        <Link to="/settings" className="hover:bg-blue-700 p-2 rounded">
          Configuración
        </Link> */}
      </nav>
    </div>
  );
};

export default Sidebar;
