import { Button, Card, Input } from "../components/ui";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        navigate("/tareas");
      } else {
        alert(result.message || "Error al registrarse");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      alert("Error al conectar con el servidor");
    }
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold text-red-300 mb-4">Registro</h3>
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Ingrese su nombre"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-red-500">Este campo es requerido</p>
          )}

          <Input
            type="email"
            placeholder="Ingrese su email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500">Este campo es requerido</p>
          )}

          <Input
            type="password"
            placeholder="Ingrese su contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500">Este campo es requerido</p>
          )}

          <Button>Registrarse</Button>
        </form>

        <p className="text-gray-400 text-sm mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default RegisterPage