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
    loadingComponent?: JSX.Element;
    errorComponent?: JSX.Element;
}

const Screen: FC<ScreenProps> = ({ className, imgClassName, loadingComponent, errorComponent, ...props }) => {
    const { state, sourceSet, index, setState, setIndex, speed, initialIndex, fullscreen, imageRef, imageError, imageLoading, setImageError, setImageLoading } = usePlayerContext();
    const [date, setDate] = useState<number>(Date.now());

    const src = useMemo(() => {
        if (state === PlaybackAction.Stop) {
            return sourceSet.at(-1);
        }

        return sourceSet.at(index);
    }, [state, sourceSet, index]);

    usePlayerTimer(useCallback(() => {
        if (index >= sourceSet.length - 1) {
            setState(PlaybackAction.Stop);
            setIndex(initialIndex);
            return;
        }

        setIndex(prev => prev + 1);
    }, [setState, setIndex, sourceSet, index]), speed);

    useErrorRefreshTimer(() => {
        setImageLoading(true);
        setDate(Date.now());
    }, imageError);

    return (
        <section
            className={cn("select-none relative bg-neutral-900", className)}
            {...props}
        >
            {imageLoading && (loadingComponent ?? <Loading />)}
            {imageError && (errorComponent ?? <Error />)}
            <img
                ref={imageRef}
                className={
                    cn(
                        "object-cover inset-0",
                        playerContentVariants({ size: fullscreen ? "fullscreen" : "default" }),
                        imgClassName
                    )
                }
                onLoad={() => setImageLoading(false)}
                onError={() => setImageError(true)}
                style={{ opacity: (imageError || imageLoading) ? 0 : 1 }}
                src={imageError ? `${src}?d=${date}` : src}
                alt={`Image ${index} of ${sourceSet.length}`}
            />
            <AmbientLights />
        </section>
    )
}

export default Screen;