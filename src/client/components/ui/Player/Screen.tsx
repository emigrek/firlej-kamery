import cn from "@client/utils/cn";
import { HTMLAttributes, FC, useState, useMemo, useCallback, useRef, useEffect } from "react";

import Loading from "./Loading";
import Error from "./Error";

import { usePlayerTimer } from "./usePlayerTimer";
import { useErrorRefreshTimer } from "./useErrorRefreshTimer";
import { usePlayerContext } from "./context";
import { PlaybackAction } from "./context";
import { playerContentVariants } from "./Content";
import { useAmbientLight } from "./useAmbientLight";

interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
    imgClassName?: string;
    loading?: boolean;
    loadingComponent?: JSX.Element;
    error?: boolean;
    errorComponent?: JSX.Element;
}

const Screen: FC<ScreenProps> = ({ className, imgClassName, loadingComponent, errorComponent, ...props }) => {
    const { state, sourceSet, index, setState, setIndex, speed, initialIndex, fullscreen, ambientLight } = usePlayerContext();
    const [loading, setLoading] = useState<boolean>(props.loading || true);
    const [error, setError] = useState<boolean>(props.error || false);
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const { imageRef, canvasRef } = useAmbientLight();

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
        <section
            className={cn("select-none relative", className)}
            {...props}
        >
            {loading && (loadingComponent || <Loading />)}
            {error && (errorComponent || <Error />)}
            <img
                ref={imageRef}
                key={refreshKey}
                className={
                    cn(
                        "object-cover inset-0",
                        playerContentVariants({ size: fullscreen ? "fullscreen" : "default" }),
                        imgClassName
                    )
                }
                onLoad={() => setLoading(false)}
                onError={() => setError(true)}
                style={{ opacity: (error || loading) ? 0 : 1 }}
                src={src}
                alt={`Snapshot ${index} of ${sourceSet.length}`}
            />
            {
                ambientLight && (
                    <canvas
                        ref={canvasRef}
                        className="fixed top-0 left-0 visible w-full h-full overflow-visible -z-10 blur-xl opacity-40"
                        aria-hidden="true"
                        width={16}
                        height={9}
                    />
                )
            }
        </section>
    )
}

export default Screen;