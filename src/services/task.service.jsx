import axios from 'axios';

const API_URL = 'http://localhost:3005/api/tasks'; // Endpoint específico para tareas

// Crear instancia de axios para tareas
const taskApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir token
taskApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const taskService = {
  /**
   * Obtener todas las tareas
   * @returns {Promise<Array>} Lista de tareas
   */
  getAll: async () => {
    try {
      const response = await taskApi.get('/');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener tareas' };
    }
  },

  /**
   * Obtener una tarea por ID
   * @param {number} id - ID de la tarea
   * @returns {Promise<Object>} Tarea encontrada
   */
  getById: async (id) => {
    try {
      const response = await taskApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al obtener la tarea' };
    }
  },

  /**
   * Crear una nueva tarea
   * @param {Object} taskData - Datos de la tarea
   * @returns {Promise<Object>} Tarea creada
   */
  create: async (taskData) => {
    try {
      const response = await taskApi.post('/', taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al crear tarea' };
    }
  },

  /**
   * Actualizar una tarea existente
   * @param {number} id - ID de la tarea
   * @param {Object} taskData - Datos actualizados
   * @returns {Promise<Object>} Tarea actualizada
   */
  update: async (id, taskData) => {
    try {
      const response = await taskApi.put(`/${id}`, taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar tarea' };
    }
  },

  /**
   * Eliminar una tarea
   * @param {number} id - ID de la tarea
   * @returns {Promise<Object>} Resultado de la operación
   */
  delete: async (id) => {
    try {
      const response = await taskApi.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al eliminar tarea' };
    }
  },

  /**
   * Actualizar estado de una tarea
   * @param {number} id - ID de la tarea
   * @param {string} status - Nuevo estado (pendiente|en progreso|completada)
   * @returns {Promise<Object>} Tarea actualizada
   */
  updateStatus: async (id, status) => {
    try {
      const response = await taskApi.patch(`/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Error al actualizar estado' };
    }
  }
};