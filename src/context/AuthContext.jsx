import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Asegurarnos que el usuario tenga la estructura esperada
        setUser({
          name: parsedUser.name,
          token: storedToken,
          ...parsedUser // incluye cualquier otra propiedad
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Limpiar datos corruptos
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      if (!userData?.name || !userData?.token) {
        throw new Error('Datos de autenticación incompletos');
      }

      const { name, token } = userData;
      
      // Estructura de datos a guardar
      const userToStore = {
        name: name,
        token: token, // si está disponible
        // otros datos no sensibles
      };

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('token', token);

      // Actualizar estado
      setUser({
        ...userToStore,
        token: token,
        isAuthenticated: true
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Limpiar en caso de error
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      if (!userData?.user || !userData?.token) {
        throw new Error('Datos de registro incompletos');
      }

      const { user, token } = userData;
      
      // Validar datos mínimos
      if (!user.name || !user.email) {
        throw new Error('Faltan datos obligatorios del usuario');
      }

      // Preparar datos para almacenar
      const userToStore = {
        name: user.name,
        email: user.email,
        // otros datos no sensibles
      };

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('token', token);

      // Actualizar estado
      setUser({
        ...userToStore,
        token: token,
        isAuthenticated: true
      });

      navigate('/dashboard');
      
    } catch (error) {
      console.error('Registration error:', error);
      // Limpiar en caso de error
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isLoading,
      isAuthenticated: !!user?.token // añadido para fácil verificación
    }}>
      {children}
    </AuthContext.Provider>
  );
};