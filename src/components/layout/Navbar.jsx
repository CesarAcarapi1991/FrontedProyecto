// // import { useContext } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { AuthContext } from '../../context/AuthContext';

// // const Navbar = () => {
// //   const { user, logout } = useContext(AuthContext);
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     logout();
// //     navigate('/');
// //   };

// //   return (
// //     <nav>
// //       <Link to="/">Inicio</Link>
// //       {user ? (
// //         <>
// //           <Link to="/dashboard">Dashboard</Link>
// //           <button onClick={handleLogout}>Cerrar Sesión</button>
// //         </>
// //       ) : (
// //         <>
// //           <Link to="/login">Iniciar Sesión</Link>
// //           <Link to="/register">Registrarse</Link>
// //         </>
// //       )}
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import './Navbar.css'; // Archivo CSS para los estilos

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="admin-navbar">
//       <div className="navbar-brand">
//         <Link to="/" className="logo-link">
//           <span className="logo-icon">⚙️</span>
//           <span className="logo-text">AdminPanel</span>
//         </Link>
//       </div>
      
//       <div className="navbar-links">
//         {user ? (
//           <>
//             <Link to="/dashboard" className="nav-link">
//               <span className="link-icon">📊</span>
//               <span className="link-text">Dashboard</span>
//             </Link>
//             <div className="user-menu">
//               <span className="user-greeting">Hola, {user.name}</span>
//               <div className="user-avatar">
//                 {user.name.charAt(0).toUpperCase()}
//               </div>
//               <button onClick={handleLogout} className="logout-button">
//                 <span className="button-icon">🚪</span>
//                 <span className="button-text">Salir</span>
//               </button>
//             </div>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="nav-link">
//               <span className="link-icon">🔑</span>
//               <span className="link-text">Ingresar</span>
//             </Link>
//             <Link to="/register" className="nav-link register-link">
//               <span className="link-icon">📝</span>
//               <span className="link-text">Registrarse</span>
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Función segura para obtener la inicial del nombre
  const getInitial = () => {
    return user?.name?.charAt(0).toUpperCase() || '?';
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo-link">
          <span className="logo-icon">⚙️</span>
          <span className="logo-text">AdminPanel</span>
        </Link>
      </div>
      
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              <span className="link-icon">📊</span>
              <span className="link-text">Dashboard</span>
            </Link>
            <div className="user-menu">
              {user.name && <span className="user-greeting">Hola, {user.name}</span>}
              <div className="user-avatar">
                {getInitial()}
              </div>
              <button onClick={handleLogout} className="logout-button">
                <span className="button-icon">🚪</span>
                <span className="button-text">Salir</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              <span className="link-icon">🔑</span>
              <span className="link-text">Ingresar</span>
            </Link>
            <Link to="/register" className="nav-link register-link">
              <span className="link-icon">📝</span>
              <span className="link-text">Registrarse</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;