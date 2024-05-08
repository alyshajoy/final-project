import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();
//hello
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const showNotification = (badge) => setNotification(badge);
  const hideNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};


