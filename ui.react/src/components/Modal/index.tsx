import React, { useState } from 'react';
import { ModalProps } from './types';
import './style.css'

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!isModalOpen) {
    return (
      <div onClick={openModal}>
        {props.closedChildren}
      </div>
    );
  }
  const handleClick = (event: React.MouseEvent) => {
    const overlay = event.currentTarget as HTMLDivElement;
    const wrapper = overlay.querySelector('.modal-wrapper') as HTMLDivElement;
    if (event.target === overlay && event.target !== wrapper) {
      closeModal();
    }
  }
  
  return (
    <>
    <div className="modal-overlay" onClick={handleClick}>
      <div className="modal-wrapper" onClick={() => {}}>
        <button onClick={closeModal}>Close</button>
        <div className="modal-content">
          {props.children}
        </div>
      </div>
    </div>
    </>
  );
};

export default Modal;