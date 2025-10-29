import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Input } from "../components/ui";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log("Intentando iniciar sesión con los siguientes datos:", data);
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Respuesta del servidor:", response);

      const result = await response.json();

      console.log("Resultado de la respuesta:", result);

      if (response.ok) {
        console.log("Token recibido correctamente:", result.token);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/tareas");
      } else {
        console.error("Error al iniciar sesión:", result.message);
        alert(result.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servidor");
    }
  });

  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h3 className="text-2xl font-bold text-white mb-4">Iniciar Sesión</h3>
        <form onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="Ingrese su email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          )}

          <Input
            type="password"
            placeholder="Ingrese su contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Este campo es requerido</p>
          )}

          <Button type="submit">Ingresar</Button>
        </form>

        <p className="text-gray-400 text-sm mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;