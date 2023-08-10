import { PlaybackAction, usePlayerStore } from "@client/stores/playerStore";
import { useEffect } from "react";
import { useTimer } from "react-use-precision-timer";

export const usePlayerTimer = (next: () => void, speed: number) => {
    const { state } = usePlayerStore();

    const timer = useTimer({
        delay: speed,
        fireOnStart: true
    }, next);

    useEffect(() => {
        state === PlaybackAction.Play ? timer.start() : timer.stop();
    }, [state]);
}