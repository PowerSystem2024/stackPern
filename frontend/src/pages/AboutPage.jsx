import { Card } from "../components/ui";

function AboutPage() {
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center p-8">
      <Card>
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold text-white mb-4">
            Acerca del Proyecto
          </h1>
          <p className="text-gray-400 mb-4">
            Este es un gestor de tareas desarrollado con el stack PERN
            (PostgreSQL, Express, React, Node.js).
          </p>
          <p className="text-gray-400 mb-4">
            Permite a los usuarios registrarse, iniciar sesión y gestionar sus
            tareas personales de manera eficiente.
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Tecnologías utilizadas:
            </h2>
            <ul className="list-disc list-inside text-gray-400 space-y-1">
              <li>React con Vite</li>
              <li>React Router DOM</li>
              <li>React Hook Form</li>
              <li>Tailwind CSS</li>
              <li>Node.js y Express</li>
              <li>PostgreSQL</li>
              <li>JWT para autenticación</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default AboutPage;