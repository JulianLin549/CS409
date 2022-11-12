import {createContext, useContext, useState, ReactNode} from "react";

type NotificationContextType = {
    notificationCount: number;
    setNotificationCount: (value: number) => void;
};
export const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);


type Props = {
    children: ReactNode;
};

export const NotificationProvider = ({ children }: Props) => {
    const [notificationCount, setNotificationCount] = useState<number>(0);

    return (
        <NotificationContext.Provider value={{ notificationCount, setNotificationCount }}>
            {children}
        </NotificationContext.Provider>
    );
};
export const useNotification = () => useContext(NotificationContext);

