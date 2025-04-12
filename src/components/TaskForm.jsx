// import { useState, useEffect } from 'react';
// import './TaskForm.css';

// const TaskForm = ({ task, onSubmit, onCancel, requireDueDate = false }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     status: 'pendiente',
//     dueDate: ''
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (task) {
//       setFormData({
//         title: task.title || '',
//         description: task.description || '',
//         status: task.status || 'pendiente',
//         dueDate: task.dueDate || ''
//       });
//     } else {
//       setFormData({
//         title: '',
//         description: '',
//         status: 'pendiente',
//         dueDate: ''
//       });
//     }
//   }, [task]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Validación de fecha si es requerida
//     if (requireDueDate && !formData.dueDate) {
//       alert('Por favor ingrese una fecha de vencimiento');
//       setIsSubmitting(false);
//       return;
//     }
    
//     try {
//       await onSubmit(formData);
//       // No limpiamos el formulario aquí
//     } catch (error) {
//       console.error('Error al guardar la tarea:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleClose = () => {
//     // Solo cerramos el modal, no limpiamos el estado
//     onCancel();
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <form className="task-form" onSubmit={handleSubmit}>
//           <div className="task-form-header">
//             <h3>{task ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h3>
//             <button 
//               type="button" 
//               className="close-btn"
//               onClick={handleClose}
//               aria-label="Cerrar formulario"
//               disabled={isSubmitting}
//             >
//               &times;
//             </button>
//           </div>

//           <div className="form-group">
//             <label htmlFor="title">Título *</label>
//             <input
//               id="title"
//               name="title"
//               type="text"
//               className="form-control"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               maxLength="100"
//               placeholder="Ingrese el título de la tarea"
//               disabled={isSubmitting}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="description">Descripción *</label>
//             <textarea
//               id="description"
//               name="description"
//               className="form-control"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               rows="4"
//               placeholder="Describa los detalles de la tarea"
//               disabled={isSubmitting}
//             />
//           </div>

//           {requireDueDate && (
//             <div className="form-group">
//               <label htmlFor="dueDate">Fecha de Limite *</label>
//               <input
//                 id="dueDate"
//                 name="dueDate"
//                 type="date"
//                 className="form-control"
//                 value={formData.dueDate}
//                 onChange={handleChange}
//                 required={requireDueDate}
//                 min={new Date().toISOString().split('T')[0]}
//                 disabled={isSubmitting}
//               />
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="status">Estado</label>
//             <select
//               id="status"
//               name="status"
//               className="status-select"
//               value={formData.status}
//               onChange={handleChange}
//               disabled={task?.status === 'completada' || isSubmitting}
//             >
//               <option value="pendiente">Pendiente</option>
//               <option value="en progreso">En Progreso</option>
//               <option value="completada">Completada</option>
//             </select>
//           </div>

//           <div className="form-actions">
//             <button 
//               type="submit" 
//               className="btn btn-primary"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="loading-text">
//                   <span className="spinner"></span>
//                   {task ? 'Actualizando...' : 'Creando...'}
//                 </span>
//               ) : (
//                 <span>{task ? 'Actualizar' : 'Crear'} Tarea</span>
//               )}
//             </button>
//             <button 
//               type="button" 
//               className="btn btn-secondary" 
//               onClick={handleClose}
//               disabled={isSubmitting}
//             >
//               Cancelar
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskForm;

import { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ task, onSubmit, onCancel, requireDueDate, error, clearError }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pendiente',
    dueDate: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'pendiente',
        dueDate: task.dueDate || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pendiente',
        dueDate: ''
      });
    }
  }, [task]);

  // useEffect(() => {
  //   if (error) {
  //     clearError();
  //   }
  // }, [formData]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 2500); // 5000 ms = 5 segundos
  
      return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta o error cambia
    }
  }, [error, clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="task-form-header">
            <h3>{task ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h3>
            <button 
              type="button" 
              className="close-btn"
              onClick={onCancel}
              aria-label="Cerrar formulario"
            >
              &times;
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="title">Título *</label>
            <input
              id="title"
              name="title"
              type="text"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength="100"
              placeholder="Ingrese el título de la tarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describa los detalles de la tarea"
            />
          </div>

          {requireDueDate && (
            <div className="form-group">
              <label htmlFor="dueDate">Fecha de Vencimiento *</label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                className="form-control"
                value={formData.dueDate}
                onChange={handleChange}
                required={requireDueDate}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="status">Estado</label>
            <select
              id="status"
              name="status"
              className="status-select"
              value={formData.status}
              onChange={handleChange}
              disabled={task?.status === 'completada'}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En Progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>

          {error && (
            <div className="form-error">
              <label className="error-label">{error}</label>
            </div>
          )}

          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              {task ? 'Actualizar' : 'Crear'} Tarea
            </button>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;