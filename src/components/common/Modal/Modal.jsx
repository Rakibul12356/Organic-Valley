const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      <div>{children}</div>
      {onClose && <button type="button" onClick={onClose}>Close</button>}
    </div>
  );
};

export default Modal;
