import React, { useEffect } from 'react';
import { useNotification } from './NotificationContext';

const WebSocketHandler = () => {
    const { showNotification } = useNotification();

    useEffect(() => {
        // Establish WebSocket connection
        const ws = new WebSocket('ws://localhost:3001');

        // Event listener for incoming messages
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'badge-earned') {
                showNotification(message.badge); // Trigger notification on badge-earned event
            }
        };

        // Cleanup function
        return () => {
            ws.close(); // Close WebSocket connection on component unmount
        };
    }, [showNotification]); // Dependency array to prevent unnecessary re-renders

    return null;
};

export default WebSocketHandler;
