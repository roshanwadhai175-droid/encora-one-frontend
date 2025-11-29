import React, { createContext, useEffect, useState, useContext } from 'react';
import * as signalR from '@microsoft/signalr';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    // Stores notifications for the history panel
    const [notifications, setNotifications] = useState([]);
    // Stores active toasts (auto-dismissing)
    const [toasts, setToasts] = useState([]);
    // Unread count for the badge
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Create Connection
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7001/notificationHub")
            .withAutomaticReconnect()
            .build();

        // Start Connection
        connection.start()
            .then(() => console.log("SignalR Connected"))
            .catch(err => console.error("SignalR Connection Error: ", err));

        // Listen for Messages
        connection.on("ReceiveNotification", (message) => {
            const newNotification = {
                id: Date.now(),
                message: message,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                read: false
            };
            
            // Add to History
            setNotifications(prev => [newNotification, ...prev]);
            setUnreadCount(prev => prev + 1);

            // Add to Toast (Auto-dismiss logic)
            setToasts(prev => [newNotification, ...prev]);
            setTimeout(() => {
                removeToast(newNotification.id);
            }, 5000);
        });

        return () => {
            connection.stop();
        };
    }, []);

    const removeToast = (id) => {
        setToasts(prev => prev.filter(n => n.id !== id));
    };

    const markAllAsRead = () => {
        setUnreadCount(0);
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);
    };

    return (
        <NotificationContext.Provider value={{ 
            notifications, 
            toasts, 
            unreadCount, 
            removeToast, 
            markAllAsRead, 
            clearNotifications 
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);