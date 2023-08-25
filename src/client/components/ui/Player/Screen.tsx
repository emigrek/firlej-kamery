import cn from "@client/utils/cn";
import { HTMLAttributes, FC, useState, useMemo, useCallback } from "react";

import Loading from "./Loading";
import Error from "./Error";

import { usePlayerTimer } from "./usePlayerTimer";
import { useErrorRefreshTimer } from "./useErrorRefreshTimer";
import { usePlayerContext } from "./context";
import { PlaybackAction } from "./context";

interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
    imgClassName?: string;
    loading?: boolean;
    loadingComponent?: JSX.Element;
    error?: boolean;
    errorComponent?: JSX.Element;
}

const Screen: FC<ScreenProps> = ({ className, imgClassName, loadingComponent, errorComponent, ...props }) => {
    const { state, sourceSet, index, screenRef, setState, setIndex, speed, initialIndex } = usePlayerContext();
    const [loading, setLoading] = useState<boolean>(props.loading || true);
    const [error, setError] = useState<boolean>(props.error || false);
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const src = useMemo(() => {
        setError(false);

        if (state === PlaybackAction.Stop) {
            return sourceSet.at(-1);
        }

        return sourceSet.at(index);
    }, [state, sourceSet, index, setError]);

    const nextImage = useCallback(() => {
        if (index >= sourceSet.length - 1) {
            setState(PlaybackAction.Stop);
            setIndex(initialIndex);
            return;
        }

        setIndex(prev => prev + 1);
    }, [setState, sourceSet, index]);

    usePlayerTimer(nextImage, speed);

    useErrorRefreshTimer(() => {
        setError(false);
        setLoading(true);
        setRefreshKey(Date.now());
    }, error);

    return (
        <div
            className={cn("select-none relative w-full h-full", className)}
            ref={screenRef}
            {...props}
        >
            {loading && (loadingComponent || <Loading />)}
            {error && (errorComponent || <Error />)}
            <img
                key={refreshKey}
                className={cn("object-cover inset-0", imgClassName)}
                onLoad={() => setLoading(false)}
                onError={() => setError(true)}
                style={{ opacity: error ? 0 : 1 }}
                src={src}
                alt={`Snapshot ${index} of ${sourceSet.length}`}
            />
        </div>
    )
}

export default Screen;