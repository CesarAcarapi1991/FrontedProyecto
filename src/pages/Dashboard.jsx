// import { useState, useEffect } from 'react';
// import { taskService } from '../services/task.service';
// import TaskCard from '../components/TaskCard';
// import TaskForm from '../components/TaskForm';
// import './Dashboard.css';
// import ErrorModal from '../components/ErrorModal';

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState('all');
//   const [showForm, setShowForm] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);
//   const [searchText, setSearchText] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [sortBy, setSortBy] = useState('dueDate');
//   const [lastUpdated, setLastUpdated] = useState(new Date());
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false); // Estado para el modal de error

//   const refreshTasks = () => {
//     setLastUpdated(new Date());
//   };

//   const handleError = (errorMessage) => {
//     setError(errorMessage);
//     setShowErrorModal(true);
//   };

//   useEffect(() => {
//     loadTasks();
//   }, [lastUpdated]);

//   const loadTasks = async () => {
//     try {
//       setLoading(true);
//       const tasksData = await taskService.getAll();
//       setTasks(tasksData);
//       setError(null);
//     } catch (err) {
//       handleError(err.message || 'Error al cargar las tareas');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?');
//     if (confirmDelete) {
//       try {
//         await taskService.delete(id);
//         refreshTasks();
//       } catch (err) {
//         handleError(err.message || 'Error al eliminar la tarea');
//       }
//     }
//   };

//   const handleStatusChange = async (id, currentStatus) => {
//     try {
//       let newStatus;
//       if (currentStatus === 'pendiente') {
//         newStatus = 'en progreso';
//       } else if (currentStatus === 'en progreso') {
//         newStatus = 'completada';
//       } else {
//         return;
//       }
      
//       await taskService.updateStatus(id, newStatus);
//       refreshTasks();
//     } catch (err) {
//       handleError(err.message || 'Error al actualizar el estado');
//     }
//   };

//   const handleSubmit = async (taskData) => {
//     try {
//       if (!currentTask) {
//         taskData.status = 'pendiente';
//       }
      
//       if (currentTask) {
//         await taskService.update(currentTask.id, taskData);
//       } else {
//         await taskService.create(taskData);
//       }
//       setShowForm(false);
//       setCurrentTask(null);
//       refreshTasks();
//     } catch (err) {
//       handleError(err.message || 'Error al guardar la tarea');
//     }
//   };

//   const handleStartDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setStartDate(selectedDate);
//     if (selectedDate && !endDate) {
//       setEndDate(selectedDate);
//     }
//   };

//   const filteredTasks = tasks.filter(task => {
//     const matchesStatus = filter === 'all' || task.status === filter;
//     const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase()) || 
//                          task.description.toLowerCase().includes(searchText.toLowerCase());
//     const taskDate = new Date(task.dueDate);
//     const matchesStartDate = !startDate || taskDate >= new Date(startDate);
//     const matchesEndDate = !endDate || taskDate <= new Date(endDate);
  
//     return matchesStatus && matchesSearch && matchesStartDate && matchesEndDate;
//   });

//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     if (sortBy === 'dueDate') {
//       return new Date(a.dueDate) - new Date(b.dueDate);
//     } else if (sortBy === 'title') {
//       return a.title.localeCompare(b.title);
//     } else if (sortBy === 'status') {
//       return a.status.localeCompare(b.status);
//     }
//     return 0;
//   });

//   if (loading) return (
//     <div className="dashboard-loading">
//       <div className="spinner"></div>
//       <p>Cargando tareas...</p>
//     </div>
//   );

//   return (
//     <div className={`dashboard ${menuOpen ? 'menu-open' : ''}`}>
//       {/* Menú lateral */}
//       <aside className="sidebar">
//         <div className="sidebar-header">
//           <h2>Mis Tareas</h2>
//           <button 
//             className="menu-toggle"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? (
//               <svg className="menu-icon" viewBox="0 0 24 24">
//                 <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
//               </svg>
//             ) : (
//               <svg className="menu-icon" viewBox="0 0 24 24">
//                 <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
//               </svg>
//             )}
//           </button>
//         </div>

//         <div className="sidebar-content">
//           <div className="search-group">
//             <svg className="search-icon" viewBox="0 0 24 24">
//               <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
//             </svg>
//             <input
//               type="text"
//               placeholder="Buscar tareas..."
//               value={searchText}
//               onChange={(e) => setSearchText(e.target.value)}
//               className="input-search"
//             />
//           </div>

//           <div className="filters-section">
//             <h3>Filtros</h3>
//             <div className="date-filters">
//               <div className="date-input">
//                 <label>Desde:</label>
//                 <div className="date-input-wrapper">
//                   <input
//                     type="date"
//                     value={startDate}
//                     onChange={handleStartDateChange}
//                     className="input-date"
//                   />
//                 </div>
//               </div>
//               <div className="date-input">
//                 <label>Hasta:</label>
//                 <div className="date-input-wrapper">
//                   <input
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="input-date white"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="select-group">
//               <label>Estado:</label>
//               <select 
//                 value={filter} 
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="status-filter"
//               >
//                 <option value="all">Todas</option>
//                 <option value="pendiente">Pendiente</option>
//                 <option value="en progreso">En progreso</option>
//                 <option value="completada">Completada</option>
//               </select>
//             </div>

//             <div className="select-group">
//               <label>Ordenar por:</label>
//               <select 
//                 value={sortBy} 
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="sort-filter"
//               >
//                 <option value="dueDate">Fecha</option>
//                 <option value="title">Título</option>
//                 <option value="status">Estado</option>
//               </select>
//             </div>
//           </div>

//           <button 
//             onClick={() => { setCurrentTask(null); setShowForm(true); }}
//             className="new-task-button"
//           >
//             <svg className="plus-icon" viewBox="0 0 24 24">
//               <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
//             </svg>
//             Nueva Tarea
//           </button>
//         </div>
//       </aside>

// {/* Modal de Error */}
// {showErrorModal && (
//       <ErrorModal 
//         error={error}
//         onClose={() => setShowErrorModal(false)}
//         onRetry={() => {
//           setShowErrorModal(false);
//           refreshTasks();
//         }}
//       />
//     )}


//       {/* Contenido principal */}
//       <main className="main-content">
//         <div className="content-header">
//           <button 
//             className="mobile-menu-toggle"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             <svg className="menu-icon" viewBox="0 0 24 24">
//               <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
//             </svg>
//             <span>Menú</span>
//           </button>
//           <h2>
//             {filter === 'all' ? 'Todas las tareas' : 
//              filter === 'pendiente' ? 'Tareas pendientes' :
//              filter === 'en progreso' ? 'Tareas en progreso' : 'Tareas completadas'}
//             <span className="task-count">{sortedTasks.length}</span>
//           </h2>
//         </div>

//         {showForm && (
//           <div className="modal-overlay">
//             <TaskForm 
//               task={currentTask} 
//               onSubmit={handleSubmit} 
//               onCancel={() => setShowForm(false)}
//               requireDueDate={true}
//             />
//           </div>
//         )}

//         {/* Modal de Error */}
//         {showErrorModal && (
//           <div className="modal-overlay">
//             <div className="modal error-modal">
//               <div className="modal-header">
//                 <h3>Error</h3>
//                 <button 
//                   className="close-btn"
//                   onClick={() => setShowErrorModal(false)}
//                   aria-label="Cerrar modal de error"
//                 >
//                   &times;
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>{error}</p>
//               </div>
//               <div className="modal-footer">
//                 <button 
//                   className="btn btn-primary"
//                   onClick={() => {
//                     setShowErrorModal(false);
//                     refreshTasks();
//                   }}
//                 >
//                   Reintentar
//                 </button>
//                 <button 
//                   className="btn btn-secondary"
//                   onClick={() => setShowErrorModal(false)}
//                 >
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="tasks-container">
//           {sortedTasks.length === 0 ? (
//             <div className="no-tasks">
//               <svg className="empty-icon" viewBox="0 0 24 24">
//                 <path fill="currentColor" d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
//               </svg>
//               <p>No hay tareas {filter !== 'all' ? `con estado "${filter}"` : ''}</p>
//               <button 
//                 onClick={() => { setCurrentTask(null); setShowForm(true); }}
//                 className="create-task-button"
//               >
//                 Crear primera tarea
//               </button>
//             </div>
//           ) : (
//             <div className="tasks-grid">
//               {sortedTasks.map(task => (
//                 <TaskCard
//                   key={task.id}
//                   task={task}
//                   onEdit={() => { setCurrentTask(task); setShowForm(true); }}
//                   onDelete={handleDelete}
//                   onStatusChange={handleStatusChange}
//                   showDeleteOnly={task.status === 'completada'}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/task.service';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortBy, setSortBy] = useState('dueDate');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const [formError, setFormError] = useState(null);

  const refreshTasks = () => {
    setLastUpdated(new Date());
  };

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const tasksData = await taskService.getAll();
      setTasks(tasksData);
    } catch (err) {
      setFormError(err.message || 'Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [lastUpdated, loadTasks]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta tarea?');
    if (confirmDelete) {
      try {
        await taskService.delete(id);
        refreshTasks();
      } catch (err) {
        setFormError(err.message || 'Error al eliminar la tarea');
      }
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      let newStatus;
      if (currentStatus === 'pendiente') {
        newStatus = 'en progreso';
      } else if (currentStatus === 'en progreso') {
        newStatus = 'completada';
      } else {
        return;
      }
      
      await taskService.updateStatus(id, newStatus);
      refreshTasks();
    } catch (err) {
      setFormError(err.message || 'Error al actualizar el estado');
    }
  };

  const handleSubmit = async (taskData) => {
    try {
      if (!currentTask) {
        taskData.status = 'pendiente';
      }
      
      if (currentTask) {
        await taskService.update(currentTask.id, taskData);
      } else {
        await taskService.create(taskData);
      }
      setShowForm(false);
      setCurrentTask(null);
      setFormError(null);
      refreshTasks();
    } catch (err) {
      setFormError(err.message || 'Error al guardar la tarea');
    }
  };

  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);
    if (selectedDate && !endDate) {
      setEndDate(selectedDate);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchText.toLowerCase());
    const taskDate = new Date(task.dueDate);
    const matchesStartDate = !startDate || taskDate >= new Date(startDate);
    const matchesEndDate = !endDate || taskDate <= new Date(endDate);
  
    return matchesStatus && matchesSearch && matchesStartDate && matchesEndDate;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  if (loading) return (
    <div className="dashboard-loading">
      <div className="spinner"></div>
      <p>Cargando tareas...</p>
    </div>
  );

  return (
    <div className={`dashboard ${menuOpen ? 'menu-open' : ''}`}>
      {/* Menú lateral */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Mis Tareas</h2>
          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            ) : (
              <svg className="menu-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            )}
          </button>
        </div>

        <div className="sidebar-content">
          <div className="search-group">
            <svg className="search-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="input-search"
            />
          </div>

          <div className="filters-section">
            <h3>Filtros</h3>
            <div className="date-filters">
              <div className="date-input">
                <label>Desde:</label>
                <div className="date-input-wrapper">
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="input-date"
                  />
                </div>
              </div>
              <div className="date-input">
                <label>Hasta:</label>
                <div className="date-input-wrapper">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="input-date white"
                  />
                </div>
              </div>
            </div>

            <div className="select-group">
              <label>Estado:</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="status-filter"
              >
                <option value="all">Todas</option>
                <option value="pendiente">Pendiente</option>
                <option value="en progreso">En progreso</option>
                <option value="completada">Completada</option>
              </select>
            </div>

            <div className="select-group">
              <label>Ordenar por:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-filter"
              >
                <option value="dueDate">Fecha</option>
                <option value="title">Título</option>
                <option value="status">Estado</option>
              </select>
            </div>
          </div>

          <button 
            onClick={() => { setCurrentTask(null); setShowForm(true); }}
            className="new-task-button"
          >
            <svg className="plus-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Nueva Tarea
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        <div className="content-header">
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="menu-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
            <span>Menú</span>
          </button>
          <h2>
            {filter === 'all' ? 'Todas las tareas' : 
             filter === 'pendiente' ? 'Tareas pendientes' :
             filter === 'en progreso' ? 'Tareas en progreso' : 'Tareas completadas'}
            <span className="task-count">{sortedTasks.length}</span>
          </h2>
        </div>

        {showForm && (
          <div className="modal-overlay">
            <TaskForm 
              task={currentTask} 
              onSubmit={handleSubmit} 
              onCancel={() => {
                setShowForm(false);
                setFormError(null);
              }}
              requireDueDate={true}
              error={formError}
              clearError={() => setFormError(null)}
            />
          </div>
        )}

        <div className="tasks-container">
          {sortedTasks.length === 0 ? (
            <div className="no-tasks">
              <svg className="empty-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
              </svg>
              <p>No hay tareas {filter !== 'all' ? `con estado "${filter}"` : ''}</p>
              <button 
                onClick={() => { setCurrentTask(null); setShowForm(true); }}
                className="create-task-button"
              >
                Crear primera tarea
              </button>
            </div>
          ) : (
            <div className="tasks-grid">
              {sortedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => { setCurrentTask(task); setShowForm(true); }}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                  showDeleteOnly={task.status === 'completada'}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;