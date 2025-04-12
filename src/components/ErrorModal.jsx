import './ErrorModal.css';

const ErrorModal = ({ error, onClose, onRetry }) => {
  return (
    <div className="modal-overlay">
      <div className="modal error-modal">
        <div className="modal-header">
          <h3>Error</h3>
          <button 
            className="close-btn"
            onClick={onClose}
            aria-label="Cerrar modal de error"
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{error}</p>
        </div>
        <div className="modal-footer">
          {onRetry && (
            <button 
              className="btn btn-primary"
              onClick={onRetry}
            >
              Reintentar
            </button>
          )}
          <button 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;