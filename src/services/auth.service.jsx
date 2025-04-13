// import axios from 'axios';

// const API_URL = 'http://localhost:3005/api/auth'; 

// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, {
//       email,
//       password
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// export const register = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, userData);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// export const getCurrentUser = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };

// export const getDashboardData = async () => {
//   try {
//     console.log(`${API_URL}/me`);
//     console.log(`Bearer ${localStorage.getItem('token')}`);
//     console.log(`Bearer ${localStorage.getItem('user')}`);
//     const response = await axios.get(`${API_URL}/me`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };



import axios from 'axios';

const API_URL = 'https://backendproyecto-tto5.onrender.com/api/auth';

// const authApi = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

export const authService = {

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  
  // export const getCurrentUser = () => {
  //   const user = localStorage.getItem('user');
  //   return user ? JSON.parse(user) : null;
  // };
  
  getDashboardData: async () => {
    try {
      console.log(`${API_URL}/me`);
      console.log(`Bearer ${localStorage.getItem('token')}`);
      console.log(`Bearer ${localStorage.getItem('user')}`);
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
  
  
};