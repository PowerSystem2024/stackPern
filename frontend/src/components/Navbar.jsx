import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [username, setUsername] = useState(() => {
    const userData = localStorage.getItem("user");
    try {
      return userData ? JSON.parse(userData).name : "";
    } catch (error) {
      return "";
    }
  });
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      const userData = localStorage.getItem("user");
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData) {
          setUsername(parsedUserData.name);
        } else {
          setUsername("");
        }
      } catch (error) {
        setUsername("");
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl text-gray-300 font-bold">Proyecto PERN</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/tareas"
              className="text-gray-300 hover:text-white transition"
            >
              Tareas
            </Link>
            <Link
              to="/tareas/crear"
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Agregar
            </Link>
            <Link
              to="/perfil"
              className="text-gray-300 hover:text-white transition"
            >
              Perfil
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out border border-red-800 hover:border-red-900"
            >
              Salir
            </button>
            <span className="text-gray-300">| {username}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
