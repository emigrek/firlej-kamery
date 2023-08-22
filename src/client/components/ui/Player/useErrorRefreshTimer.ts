import { useEffect } from "react";

export const useErrorRefreshTimer = (next: () => void, error: boolean) => {
    useEffect(() => {
        let i: NodeJS.Timeout;
        
        if (error) {
            i = setInterval(() => {
                next();
            }, 3000);
        }

        return () => {
            clearInterval(i);
        }
    }, [error]);
}