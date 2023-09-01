import cn from "@client/utils/cn";
import { HTMLAttributes, FC, useState, useMemo, useCallback } from "react";

import Loading from "./Loading";
import Error from "./Error";
import AmbientLights from "./AmbientLights";

import { usePlayerTimer } from "./usePlayerTimer";
import { useErrorRefreshTimer } from "./useErrorRefreshTimer";
import { usePlayerContext, PlaybackAction } from "./context";
import { playerContentVariants } from "./Content";

interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
    imgClassName?: string;
    refreshKey?: string;
    loading?: boolean;
    loadingComponent?: JSX.Element;
    error?: boolean;
    errorComponent?: JSX.Element;
}

const Screen: FC<ScreenProps> = ({ className, imgClassName, loadingComponent, errorComponent, refreshKey, ...props }) => {
    const { state, sourceSet, index, setState, setIndex, speed, initialIndex, fullscreen, imageRef } = usePlayerContext();
    const [loading, setLoading] = useState<boolean>(props.loading ?? true);
    const [error, setError] = useState<boolean>(props.error ?? false);
    const [date, setDate] = useState<number>(Date.now());

    const key = useMemo(() => {
        if (refreshKey) return refreshKey;
        return date.toString();
    }, [refreshKey, date]);

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
        setDate(Date.now());
    }, error);

    return (
        <section
            className={cn("select-none relative", className)}
            {...props}
        >
            {loading && (loadingComponent ?? <Loading />)}
            {error && (errorComponent ?? <Error />)}
            <img
                ref={imageRef}
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
                src={`${src}?d=${key}`}
                alt={`Image ${index} of ${sourceSet.length}`}
            />
            <AmbientLights />
        </section>
    )
}

export default Screen;