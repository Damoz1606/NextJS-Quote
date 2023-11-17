import React, { ReactNode, createContext, useRef, useState } from 'react'
import styles from '@/styles/Notification.module.css'

type NotificationContextProps = {
    setNotification: (value: string) => void;
}

const NotificationContext = createContext<NotificationContextProps>({
    setNotification: () => { }
});

type NotificationProviderProps = {
    children: ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {

    const [text, setText] = useState("");

    const notificationRef = useRef<HTMLDivElement>(null);

    const setNotification = (value: string) => {
        if (notificationRef.current) {
            setText(value);
            notificationRef.current.classList.add(`${styles.active}`);
            setTimeout(() => {
                if (notificationRef.current)
                    notificationRef.current.classList.remove(`${styles.active}`);
            }, 4000);
        }
    }

    const value: NotificationContextProps = {
        setNotification
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <div ref={notificationRef} className={`${styles.notification}`}>
                <p className={`${styles.message}`}>{text}</p>
            </div>
        </NotificationContext.Provider>
    )
}

export { NotificationProvider, NotificationContext }