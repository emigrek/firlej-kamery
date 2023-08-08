import { useState } from 'react';

enum PlayStateEnum {
    PLAY = 1,
    STOP = 0
}

const usePlayerState = () => {
    const [state, setState] = useState<PlayStateEnum>(PlayStateEnum.STOP);
    const [index, setIndex] = useState<number>(0);
    const [interval, setInterval] = useState<number>(1000);

    const toggle = () => {
        state === PlayStateEnum.PLAY ? setState(PlayStateEnum.STOP) : setState(PlayStateEnum.PLAY)
    }

    return {
        state, setState,
        index, setIndex,
        interval, setInterval,
        toggle
    }
};

export { usePlayerState, PlayStateEnum };