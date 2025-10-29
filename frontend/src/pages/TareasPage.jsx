import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "../components/ui";

function TareasPage() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/tareas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setTareas(data);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
      }
    };

    cargarTareas();
  }, []);

  const eliminarTarea = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta tarea?")) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/api/tareas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Mis Tareas</h1>
      </div>

      {tareas.length === 0 ? (
        <Card>
          <p className="text-gray-400 text-center">
            No tienes tareas. ¡Crea una nueva!
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tareas.map((tarea) => (
            <Card key={tarea.id}>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-white">
                  {tarea.titulo}
                </h3>
                <p className="text-gray-400">{tarea.descripcion}</p>
                <div className="flex gap-2 mt-4">
                  <Link to={`/tareas/editar/${tarea.id}`}>
                    <Button>Editar</Button>
                  </Link>
                  <button
                    onClick={() => eliminarTarea(tarea.id)}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-400 text-sm font-semibold"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default TareasPage;