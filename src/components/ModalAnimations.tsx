// UnfoldingModal.tsx
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./ModalAnimations.css"; // Ensure this path is correct based on your project structure

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
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      document.body.classList.add("modal-active");
    } else if (isVisible) {
      setIsAnimating(true);
      // Start closing animation
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
        document.body.classList.remove("modal-active");
      }, 1000); // Duration should match the CSS animation duration

      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent closing when clicking inside the modal
  };

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div
      id="unfolding-modal-container"
      className={`${isOpen ? "open" : "closing"} ${className}`}
      onClick={handleContainerClick}
    >
      <div className="modal-background">
        <div
          className={`modal ${!isOpen && "closing"}`}
          onClick={handleModalClick}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UnfoldingModal;
