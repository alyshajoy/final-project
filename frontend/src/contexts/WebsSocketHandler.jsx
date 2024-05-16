import React, { useEffect } from 'react';
import { useNotification } from './NotificationContext';

const WebSocketHandler = () => {
    const { showNotification } = useNotification();

    useEffect(() => {
        // Establish WebSocket connection
        const ws = new WebSocket('ws://localhost:3001');
        ws.onopen = () => {
            console.log('WebSocket connection established');
        };
        // Event listener for incoming messages
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("message.badge", message.badge)
            if (message.type === 'badge-earned') {
                showNotification(message.badge); // Trigger notification on badge-earned event
            }
        };

        // Cleanup function
        return () => {
            if (ws.readyState === 1) { // <-- This is important
                ws.close();
            }
        };
    }, [showNotification]); // Dependency array to prevent unnecessary re-renders

    return null;
};

export default WebSocketHandler;
