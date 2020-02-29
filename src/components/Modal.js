import React from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    background:
      'linear-gradient(183deg,rgba(243,243,251,1) 0%,rgba(253,251,253,1) 100%) no-repeat',
    border: 'unset',
    boxShadow: 'rgba(86, 128, 248, 0.1) 17px 27px 53px'
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
