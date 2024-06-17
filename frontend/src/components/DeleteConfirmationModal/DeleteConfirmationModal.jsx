//import React from 'react';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ onClose, onDelete }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <div className="buttons">
          <button className="delete-button" onClick={onDelete}>Yes (Delete Spot)</button>
          <button className="keep-button" onClick={onClose}>No (Keep Spot)</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
