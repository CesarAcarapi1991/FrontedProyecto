// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div>
//       <h1>Bienvenido</h1>
//       <p>
//         <Link to="/login">Inicia sesión</Link> o <Link to="/register">regístrate</Link>
//       </p>
//     </div>
//   );
// };

// export default Home;
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Home.css'; // Archivo CSS para los estilos

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dark-home">
      <div className="home-container">
        <h1 className="home-title">Bienvenido al Panel de Administración de Tareas</h1>
        <p className="home-subtitle">
          Gestiona tu tiempo y tarea de manera eficiente y segura
        </p>
        
        {!user && (
          <div className="auth-options">
            <Link to="/login" className="auth-button login-button">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="auth-button register-button">
              Registrarse
            </Link>
          </div>
        )}

        {user && (
          <div className="user-welcome">
            <p>Ya has iniciado sesión como <span className="username">{user.name}</span></p>
            <Link to="/dashboard" className="dashboard-button">
              Ir al Dashboard
            </Link>
          </div>
        )}

        {/* <div className="features">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Seguridad</h3>
            <p>Protección avanzada para tus datos</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Analíticas</h3>
            <p>Métricas en tiempo real</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚙️</div>
            <h3>Control</h3>
            <p>Gestión total de tu contenido</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;