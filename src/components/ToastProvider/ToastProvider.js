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
  const clearToasts = React.useCallback(() => {
    setToasts([])
  }, [])

  const value = React.useMemo(() => {
    return ({
      toasts,
      addToast,
      removeToast,
      clearToasts
    });
  }, [addToast, clearToasts, removeToast, toasts]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
