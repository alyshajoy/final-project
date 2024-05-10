import React, { createContext, useState, useContext } from 'react';
import badgesData from '../Mocks/BadgeMockData';
const NotificationContext = createContext();
//hello
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  // const testBadge = badgesData[0];
  const [notification, setNotification] = useState(null); //change back to null
  const showNotification = (badge) => setNotification(badge); //change back to just Badge
  const hideNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};


