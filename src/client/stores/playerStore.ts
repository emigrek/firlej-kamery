import { Timer } from "react-use-precision-timer";
import { create } from "zustand";

enum PlaybackAction {
    Stop = 0,
    Play = 1
}

interface PlayerState {
    state: PlaybackAction;
    setState: (state: PlaybackAction) => void;
    index: number;
    setIndex: (index: number) => void;
    speed: number;
    setSpeed: (speed: number) => void;
    toggle: () => void;
}

const usePlayerState = create<PlayerState>(set => ({
    state: PlaybackAction.Stop,
    setState: (state: PlaybackAction) => set({ state }),
    index: 0,
    setIndex: (index: number) => set({ index }),
    speed: 1000,
    setSpeed: (speed: number) => set({ speed }),
    toggle: () => set(state => ({
        state: state.state === PlaybackAction.Play ? PlaybackAction.Stop : PlaybackAction.Play
    }))
}));

export { usePlayerState, PlaybackAction };