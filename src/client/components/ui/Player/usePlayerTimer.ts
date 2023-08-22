import { useEffect } from "react";
import { useTimer } from "react-use-precision-timer";
import { PlaybackAction, usePlayerContext } from "./context";

export const usePlayerTimer = (next: () => void, speed: number) => {
    const { state } = usePlayerContext();

    const timer = useTimer({
        delay: speed
    }, next);

    useEffect(() => {
        state === PlaybackAction.Play ? timer.start() : timer.stop();
    }, [state]);
}