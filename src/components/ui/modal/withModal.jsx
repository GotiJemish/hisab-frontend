import { CloseIcon } from "@/icons";
import React, { useEffect, useRef } from "react";
// import Modal from "../ui/modal";

// 🧩 Higher-Order Component
const withModal = (WrappedComponent) => {
  return function ModalWrapper(props) {
    const {
      isOpen,
      onClose,
      title = null,
      showCloseButton = true, // Default to true for backwards compatibility
      isFullscreen = false,
      className = "max-w-[700px] p-6 lg:p-10",
    } = props;

    const modalRef = useRef(null);

    useEffect(() => {
      const handleEscape = (event) => {
        if (event.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, onClose]);

    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }

      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    if (!isOpen) return null;

    const contentClasses = isFullscreen
      ? "w-full h-full"
      : "relative w-full rounded-3xl bg-white  dark:bg-gray-900";

    return (
      //   <Modal isOpen={isOpen} onClose={closeModal} className={className}>
      <div className="fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999">
        {!isFullscreen && (
          <div
            className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
            onClick={onClose}
          ></div>
        )}
        <div
          ref={modalRef}
          className={`${contentClasses} ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
            >
              <CloseIcon className="fill-current" />
            </button>
          )}
          <div>
            <div className="flex flex-col px-2 overflow-y-auto custom-scrollbar">
              {title && (
                <div>
                  <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                    {title}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Plan your next big moment: schedule or edit an event to stay
                    on track
                  </p>
                </div>
              )}
              <WrappedComponent {...props} />
            </div>
          </div>
        </div>
      </div>
      //   </Modal>
    );
  };
};

export default withModal;
