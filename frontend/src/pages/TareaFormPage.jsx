import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input } from "../components/ui";

function TareaFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = !!id;

  useEffect(() => {
    if (esEdicion) {
      const cargarTarea = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:3000/api/tareas/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setValue("titulo", data.titulo);
          setValue("descripcion", data.descripcion);
        } catch (error) {
          console.error("Error al cargar tarea:", error);
        }
      };
      cargarTarea();
    }
  }, [id, esEdicion, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = localStorage.getItem("token");
      const url = esEdicion
        ? `http://localhost:3000/api/tareas/${id}`
        : "http://localhost:3000/api/tareas";
      const method = esEdicion ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      navigate("/tareas");
    } catch (error) {
      console.error("Error al guardar tarea:", error);
    }
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold text-white mb-4">
          {esEdicion ? "Editar Tarea" : "Nueva Tarea"}
        </h3>
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Título de la tarea"
            {...register("titulo", { required: true })}
          />
          {errors.titulo && (
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          )}

          <textarea
            placeholder="Descripción de la tarea"
            className="bg-zinc-800 px-3 py-2 block my-2 w-full rounded-md"
            rows="4"
            {...register("descripcion")}
          />

          <div className="flex gap-2">
            <Button type="submit">
              {esEdicion ? "Actualizar" : "Crear"}
            </Button>
            <button
              type="button"
              onClick={() => navigate("/tareas")}
              className="px-3 py-1.5 bg-zinc-700 text-white rounded-md hover:bg-zinc-600 text-sm font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default TareaFormPage;