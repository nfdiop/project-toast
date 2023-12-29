import React from 'react';


export const ToastContext = React.createContext();

function ToastProvider({ children }) {
 const [toasts, setToasts] = React.useState([]);

  // Helper functions for dealing with toasts
  const addToast = React.useCallback((message, variant) => {
    setToasts((t) => [...t, { id: crypto.randomUUID(), message, variant }]);
  }, []);
  const removeToast = React.useCallback((id) => {
    setToasts((t) => t.filter((t) => t.id !== id));
  }, []);

  const value = React.useMemo(() => ({
    toasts,
    addToast,
    removeToast,
  }), [addToast, removeToast, toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
