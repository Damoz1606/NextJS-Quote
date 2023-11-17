import { NotificationContext } from "@/context";
import { useContext } from "react"

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context)
        throw new Error("'useNotification' this only can be used inside a notification provider");
    return context;
}