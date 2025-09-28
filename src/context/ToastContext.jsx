"use client";

import Alert from "@/components/ui/alert/Alert";
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
const MAX_VISIBLE_TOASTS = 4;
const FADE_OUT_DURATION = 300;
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ message, type = "info", duration = 3000 }) => {
    const id = uuidv4();

    const newToast = { id, message, type, isRemoving: false };

    setToasts((prev) => {
      if (prev.length < MAX_VISIBLE_TOASTS) {
        return [...prev, newToast];
      } else {
        // Mark oldest toast as removing
        const updated = prev.map((t, i) =>
          i === 0 ? { ...t, isRemoving: true } : t
        );

        // Add new toast at end
        return [...updated, newToast];
      }
    });


    // Remove after specified duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);


  useEffect(() => {
    const removingToast = toasts.find((t) => t.isRemoving);
    if (!removingToast) return;

    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== removingToast.id));
    }, FADE_OUT_DURATION);

    return () => clearTimeout(timeout);
  }, [toasts]);

  const closeToast = (id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isRemoving: true } : t))
    );
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 items-end">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`transition-opacity duration-300 ${
              toast.isRemoving ? "opacity-0" : "animate-toast-in"
            }`}
          >
          <Alert variant={toast?.type} message={toast?.message} showLink={false} linkHref="#" linkText="Learn more" closeToast={() => closeToast(toast.id)} />
        </div>
        ))}

      </div>


       <style jsx global>{`
        @keyframes toast-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-toast-in {
          animation: toast-in 0.3s ease-out forwards;
        }
      `}</style>
    </ToastContext.Provider>
  );
};


export const useToast = () => useContext(ToastContext);