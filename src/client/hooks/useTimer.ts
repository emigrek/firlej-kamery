import { useEffect, useState } from "react";

const useTimer = (interval: number, callback: () => void) => {
    const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (!refreshInterval) {
            setRefreshInterval(setInterval(() => {
                callback();
            }, interval));
        }

        return () => {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        }
    }, [refreshInterval, interval, callback]);

    return refreshInterval;
}

export default useTimer;