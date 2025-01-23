// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Modal.css'; // Assurez-vous que ce fichier CSS existe

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {/* Bouton de fermeture */}
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                {/* Contenu de la modale */}
                {children}
                {/* Bouton supplémentaire pour fermer la modale */}
                <button className="modal-close-button" onClick={onClose}>
                    Fermer
                </button>
            </div>
        </div>
    );
};

export default Modal;