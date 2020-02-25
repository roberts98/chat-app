import React from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export function Modal({ children, isOpen, setIsOpen }) {
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <ReactModal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
}
