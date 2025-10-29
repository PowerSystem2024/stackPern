import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui";

function ProfilePage() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:3000/api/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        navigate("/login");
      }
    };

    cargarPerfil();
  }, [navigate]);

  if (!usuario) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-8">
      <Card>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Mi Perfil</h1>
          <div className="space-y-3 mb-6">
            <p className="text-gray-400">
              <span className="font-semibold text-white">Nombre:</span>{" "}
              {usuario.name}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-white">Email:</span>{" "}
              {usuario.email}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;