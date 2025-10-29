import { Link } from "react-router-dom";
import { Button, Card } from "../components/ui";

function HomePage() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Bienvenido al Gestor de Tareas
          </h1>
          <p className="text-gray-400 mb-6">
            Organiza tus tareas de manera eficiente y productiva
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button>Registrarse</Button>
            </Link>
            <Link to="/login">
              <button className="px-3 py-1.5 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 text-sm font-semibold">
                Iniciar Sesión
              </button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HomePage;