import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(import.meta.env.VITE_BASE_URL, {
    transports: ["websocket"], // 🚀 Force WebSocket only
    secure: true,              // ✅ Use HTTPS/WSS
    reconnection: true,        // 🔄 Auto reconnect
    reconnectionAttempts: 5,   // Retry 5 times
    reconnectionDelay: 1000,   // 1 sec between retries
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on('connect', () => {
            console.log('✅ Connected to server with ID:', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('❌ Disconnected from server:', reason);
        });

        socket.on('connect_error', (err) => {
            console.error('⚠️ Connection error:', err.message);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
