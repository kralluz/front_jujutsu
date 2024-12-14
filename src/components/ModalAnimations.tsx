import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./ModalAnimations.css";

interface UnfoldingModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const UnfoldingModal: React.FC<UnfoldingModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.classList.add("modal-active");
    } else if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.classList.remove("modal-active");
      }, 500); // Reduzi para 500ms para maior fluidez

      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div
      id="unfolding-modal-container"
      className={`modal-container ${isOpen ? "open" : "closing"} ${className}`}
      onClick={handleContainerClick}
    >
      <div className="modal-overlay">
        <div
          className={`modal-content ${!isOpen ? "closing" : ""}`}
          onClick={handleModalClick}
        >
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar Modal">
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UnfoldingModal;
