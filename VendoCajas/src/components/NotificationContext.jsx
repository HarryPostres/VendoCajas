import { createContext, useContext, useState } from "react";
import "../css/NotificationContext.css"


const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showNotification = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 4000); // se borra a los 4 segundos
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {message && (
        <div className="notification-container">
          <p>{message}</p>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
