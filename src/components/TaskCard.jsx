import { FaEdit, FaTrash, FaCheckCircle, FaSpinner, FaClock } from 'react-icons/fa';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const getStatusConfig = () => {
    switch(task.status) {
      case 'completada':
        return {
          color: '#2ecc71',
          icon: <FaCheckCircle className="status-icon" />,
          text: 'Completada',
          action: null
        };
      case 'en progreso':
        return {
          color: '#3498db',
          icon: <FaSpinner className="status-icon spin" />,
          text: 'En Progreso',
          action: null //() => onStatusChange(task.id, 'completada')
        };
      default:
        return {
          color: '#f39c12',
          icon: <FaClock className="status-icon" />,
          text: 'Pendiente',
          action: null// () => onStatusChange(task.id, 'en progreso')
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="task-card" style={{ borderLeft: `4px solid ${statusConfig.color}` }}>
      <div className="task-header">
        <h3><b>{task.title}</b></h3>
        <div className="task-actions">
          {task.status !== 'completada' && (
            <button 
              onClick={() => onEdit(task)}
              className="action-button edit"
              aria-label="Editar tarea"
            >
              <FaEdit />
            </button>  
          )}
          {task.status === 'completada' && (
            <button 
              onClick={() => onDelete(task.id)}
              className="action-button delete"
              aria-label="Eliminar tarea"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-footer">
        <div className="task-meta">
          <span className="task-due-date">
            <b>Fecha Limite:</b> {new Date(task.dueDate).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>
        
        <div className="status-controls">
          {statusConfig.action && (
            <button 
              onClick={statusConfig.action}
              className="status-button"
              style={{ backgroundColor: statusConfig.color }}
            >
              {statusConfig.icon}
              <span>{statusConfig.text}</span>
            </button>
          )}
          {!statusConfig.action && (
            <div className="status-display" style={{ color: statusConfig.color }}>
              {statusConfig.icon}
              <span>{statusConfig.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;