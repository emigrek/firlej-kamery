import cn from "@client/utils/cn";
import { HTMLAttributes, FC, useState, useMemo, useCallback } from "react";
import { usePlayerContext } from "./context";
import { PlaybackAction } from "./context";

import Loading from "./Loading";
import Error from "./Error";
import { VariantProps, cva } from "class-variance-authority";
import { usePlayerTimer } from "./usePlayerTimer";
import { useErrorRefreshTimer } from "./useErrorRefreshTimer";

const screenVariants = cva(
    "select-none aspect-video relative overflow-hidden",
    {
        variants: {
            size: {
                undefined: "w-full h-full",
                windowed: "w-[21rem] xs:w-[24rem] sm:w-auto sm:h-[20rem] md:h-[26rem] lg:h-[35rem]",
                fullscreen: "w-screen h-screen"
            }
        },
        defaultVariants: {
            size: "undefined"
        }
    }
);


interface ScreenProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof screenVariants> {
    imgClassName?: string;
    loading?: boolean;
    loadingComponent?: JSX.Element;
    error?: boolean;
    errorComponent?: JSX.Element;
}

const Screen: FC<ScreenProps> = ({ className, imgClassName, loadingComponent, errorComponent, size, ...props }) => {
    const { state, sourceSet, index, fullscreen, screenRef, setState, setIndex, speed, initialIndex } = usePlayerContext();
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
            className={cn(
                screenVariants({
                    size: fullscreen ? "fullscreen" : size
                }),
                className
            )}
            ref={screenRef}
            {...props}
        >
            {loading && (loadingComponent || <Loading />)}
            {error && (errorComponent || <Error />)}
            <img
                key={refreshKey}
                className={cn("object-cover inset-0 w-full h-full", imgClassName)}
                onLoad={() => setLoading(false)}
                onError={() => setError(true)}
                style={{ opacity: error ? 0 : 1 }}
                src={src}
                alt={`Snapshot ${index} of ${sourceSet.length}`}
            />
        </div>
    )
}

export { Screen, screenVariants };