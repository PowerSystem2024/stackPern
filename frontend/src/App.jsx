import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import TareasPage from './pages/TareasPage';
import TareaFormPage from './pages/TareaFormPage';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tareas"
          element={
            <ProtectedRoute>
              <TareasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tareas/crear"
          element={
            <ProtectedRoute>
              <TareaFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tareas/editar/:id"
          element={
            <ProtectedRoute>
              <TareaFormPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
