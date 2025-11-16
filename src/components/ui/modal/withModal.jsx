import Form from "@/components/form/Form";
import { CloseIcon } from "@/icons";
import React, { useEffect, useRef } from "react";
import Button from "../button/Button";
// import Modal from "../ui/modal";

// 🧩 Higher-Order Component
const withModal = (WrappedComponent) => {
  return function ModalWrapper(props) {
    const {
      isOpen,
      onClose,
      handleSubmit=()=>{},
      title = null,
      description = null,
      showCloseButton = true, // Default to true for backwards compatibility
      isFullscreen = false,
      size = "md",
      className = "",
      
    } = props;

    const modalRef = useRef(null);
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-[700px]",
      lg: "max-w-[900px]",
      xl: "max-w-xl",
      fullwidth: "max-w-screen",
    };

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

    return (
      <div className="fixed inset-0 flex items-center justify-center  modal z-99999 overflow-hidden">
        {!isFullscreen && (
          <div
            className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-[32px]"
            onClick={onClose}
          ></div>
        )}

        <div
          ref={modalRef}
          className={`w-full h-full overflow-y-auto relative ${className} `}
          onClick={onClose}
        >
          <div
            className={`${
              sizeClasses[isFullscreen ? "fullwidth" : size]
            } rounded-3xl relative mx-auto bg-white dark:bg-gray-900`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="py-2 px-6">
              <div className="flex justify-between sticky top-0 py-4 bg-white border-b z-999 dark:bg-gray-900">
                {title && (
                  <div>
                    <h5 className="font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                      {title}
                    </h5>
                    {description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {description}
                      </p>
                    )}
                  </div>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="z-999 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white  sm:h-10 sm:w-10"
                  >
                    <CloseIcon className="fill-current" />
                  </button>
                )}
              </div>
              <Form onSubmit={(e)=>{e.preventDefault(); handleSubmit();}}>
                <WrappedComponent {...props} />
                <div className="flex items-center gap-3 mt-6 sm:justify-end border-t sticky bottom-0 py-4 z-999 bg-white dark:bg-gray-900">
                  <Button
                    title={"Close"}
                    variant="outline"
                    size="model"
                    onClick={onClose}
                  />
                  <Button
                    title={"Add Contact"}
                    size="model"
                    type="submit"
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default withModal;

{
  /* Event Color */
}
{
  /* <div className="mt-6">
        <label className="block mb-4 text-sm font-medium text-gray-700 dark:text-gray-400">
          Event Color
        </label>
        <div className="flex flex-wrap items-center gap-4 sm:gap-5">
          {Object.entries(calendarsEvents || {}).map(([key, value]) => (
            <label
              key={key}
              htmlFor={`modal${key}`}
              className="flex items-center text-sm text-gray-700 dark:text-gray-400"
            >
              <input
                className="sr-only"
                type="radio"
                name="event-level"
                value={key}
                id={`modal${key}`}
                checked={eventLevel === key}
                onChange={() => setEventLevel(key)}
              />
              <span className="flex items-center justify-center w-5 h-5 mr-2 border border-gray-300 rounded-full dark:border-gray-700">
                <span
                  className={`h-2 w-2 rounded-full bg-white ${
                    eventLevel === key ? "block" : "hidden"
                  }`}
                ></span>
              </span>
              {key}
            </label>
          ))}
        </div>
      </div> */
}

{
  /* Dates */
}
{
  /* <div className="mt-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Enter Start Date
        </label>
        <input
          type="date"
          value={eventStartDate}
          onChange={(e) => setEventStartDate(e.target.value)}
          className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
        />
      </div>

      <div className="mt-6">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
          Enter End Date
        </label>
        <input
          type="date"
          value={eventEndDate}
          onChange={(e) => setEventEndDate(e.target.value)}
          className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:text-white/90"
        />
      </div> */
}

{
  /* Buttons */
}
