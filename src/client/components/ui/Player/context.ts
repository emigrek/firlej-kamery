import React from 'react';

enum PlaybackAction {
    Play = 'play',
    Pause = 'pause',
    Stop = 'stop'
}

interface PlayerContext {
    state: PlaybackAction;
    setState: React.Dispatch<React.SetStateAction<PlaybackAction>>;
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    initialIndex: number;
    setInitialIndex: React.Dispatch<React.SetStateAction<number>>;
    sourceSet: string[],
    setSourceSet: React.Dispatch<React.SetStateAction<string[]>>;
    fullscreen: boolean;
    setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
    progressTooltipVisible: boolean;
    setProgressTooltipVisible: React.Dispatch<React.SetStateAction<boolean>>;
    preloading: boolean;
    setPreloading: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
    clear: () => void;
    playerRef: (node: HTMLElement | null) => void;
    controlsRef: (node: HTMLElement | null) => void;
    progressThumbRef: (node: HTMLElement | null) => void;
    playerNode: HTMLElement | null;
    controlsNode: HTMLElement | null;
    progressThumbNode: HTMLElement | null;
}

export const PlayerContext = React.createContext<PlayerContext | undefined>(undefined);

export const usePlayerContext = () => {
    const context = React.useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayerContext must be used within a PlayerContextProvider');
    }
    return context;
};

export { PlaybackAction };