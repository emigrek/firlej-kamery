import { FC, ReactNode, useState, useEffect, useCallback } from "react";
import { PlayerContext } from "./context";
import { PlaybackAction } from "./context";
import { nanoid } from "nanoid";
import { cacheImages } from "./cacheImages";

interface RootProps {
    state?: PlaybackAction;
    speed?: number;
    index?: number;
    fullscreen?: boolean;
    progressTooltipVisible?: boolean;
    controlsVisible?: boolean;
    sourceSet: string[];
    children?: ReactNode;
}

const Root: FC<RootProps> = ({ children, ...props }) => {
    const [id, setId] = useState<string>(nanoid());
    const [state, setState] = useState<PlaybackAction>(props.state ?? PlaybackAction.Stop);
    const [index, setIndex] = useState<number>(props.index ?? 0);
    const [initialIndex, setInitialIndex] = useState<number>(props.index ?? 0);
    const [speed, setSpeed] = useState<number>(props.speed ?? 800);
    const [sourceSet, setSourceSet] = useState<string[]>(props.sourceSet);
    const [fullscreen, setFullscreen] = useState<boolean>(props.fullscreen ?? false);
    const [progressTooltipVisible, setProgressTooltipVisible] = useState<boolean>(props.progressTooltipVisible ?? false);
    const [controlsVisible, setControlsVisible] = useState<boolean>(props.controlsVisible ?? true);
    const [preloading, setPreloading] = useState<boolean>(false);

    const [controlsNode, setControlsNode] = useState<HTMLElement | null>(null);
    const [screenNode, setScreenNode] = useState<HTMLElement | null>(null);
    const [progressThumbNode, setProgressThumbNode] = useState<HTMLElement | null>(null);

    const controlsRef = useCallback((node: HTMLElement | null) => {
        setControlsNode(node);
    }, []);

    const screenRef = useCallback((node: HTMLElement | null) => {
        setScreenNode(node);
    }, []);

    const progressThumbRef = useCallback((node: HTMLElement | null) => {
        setProgressThumbNode(node);
    }, []);

    useEffect(() => {
        setSourceSet(props.sourceSet);
        setIndex(props.sourceSet.length - 1);
        setInitialIndex(props.sourceSet.length - 1);
    }, [props.sourceSet])

    const toggle = () => {
        switch (state) {
            case PlaybackAction.Play:
                setState(PlaybackAction.Pause);
                break;
            case PlaybackAction.Pause:
                if (index >= sourceSet.length - 1) {
                    setIndex(0);
                }
                setPreloading(true);
                cacheImages(sourceSet, index)
                    .then(() => setState(PlaybackAction.Play))
                    .catch(() => setState(PlaybackAction.Play))
                    .finally(() => setPreloading(false));
                break;
            case PlaybackAction.Stop:
                setIndex(0);
                setPreloading(true);
                cacheImages(sourceSet, index)
                    .then(() => setState(PlaybackAction.Play))
                    .catch(() => setState(PlaybackAction.Play))
                    .finally(() => setPreloading(false));
                break;
        }
    }

    const clear = () => {
        setState(PlaybackAction.Stop);
        setIndex(0);
        setSpeed(800);
        setSourceSet([]);
    }

    useEffect(() => {
        document.onfullscreenchange = () => {
            setFullscreen(!!document.fullscreenElement);
        }

        return () => {
            document.onfullscreenchange = null;
        }
    }, [document]);

    return (
        <PlayerContext.Provider value={{
            id,
            setId,
            state,
            setState,
            index,
            setIndex,
            initialIndex,
            setInitialIndex,
            speed,
            setSpeed,
            sourceSet,
            setSourceSet,
            fullscreen,
            setFullscreen,
            progressTooltipVisible,
            setProgressTooltipVisible,
            controlsVisible,
            setControlsVisible,
            preloading,
            setPreloading,
            controlsNode,
            controlsRef,
            screenNode,
            screenRef,
            progressThumbNode,
            progressThumbRef,
            toggle,
            clear,
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default Root;