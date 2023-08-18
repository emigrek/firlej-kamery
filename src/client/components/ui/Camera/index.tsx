import { FC, HTMLAttributes, useEffect, Suspense } from 'react';
import { Camera as CameraInterface } from '@shared/cameras';

import Snapshot from '@client/components/ui/Snapshot';
import Player from '@client/components/ui/Player';
import Hoverable from '@client/components/Hoverable';
import Error from './error';
import Loader from './loader';

import { useSnapshots } from '@client/hooks/useSnapshots';
import useCameraStore from '@client/stores/cameraStore';

import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { cva } from 'class-variance-authority';
import cn from '@client/utils/cn';
import { PlaybackAction, usePlayerStore } from '@client/stores/playerStore';

interface CameraProps extends HTMLAttributes<HTMLDivElement> {
    camera: CameraInterface;
}

const CameraWrapper = cva('px-4 w-screen lg:w-auto lg:h-[60vh] aspect-video relative flex items-center');

const Camera: FC<CameraProps> = ({ camera, ...props }) => {
    const { id } = camera;

    const defaultSnapshot = {
        cameraId: id,
        timestamp: Date.now(),
        url: camera.url,
        latest: true
    };
    const { data, isLoading, isError, refetch } = useSnapshots(camera);
    const { setSnapshots, setFilteredSnapshots, snapshot, setSnapshot, filter, clear } = useCameraStore();
    const { state } = usePlayerStore();

    useEffect(() => {
        const filtered = [...data].filter(filter.function);

        setSnapshots(data);
        setFilteredSnapshots(filtered);
        setSnapshot(filtered.at(-1) || defaultSnapshot);

        return () => {
            clear();
        }
    }, [data, setFilteredSnapshots, setSnapshots, setSnapshot]);

    return (
        <Hoverable className={cn(CameraWrapper(), "group/camera")}>
            {
                (isHovered, isTouch) => (
                    <>
                        <Snapshot
                            snapshot={snapshot || defaultSnapshot}
                            autoRefresh
                            zoomable
                            {...props}
                        />
                        <AnimatePresence>
                            {
                                (isHovered || isTouch || state === PlaybackAction.Play) && (
                                    <Player
                                        className="absolute z-30 rounded-b-lg inset-x-4 bottom-2"
                                        defaultSnapshot={defaultSnapshot}
                                        isLoading={isLoading}
                                        isError={isError}
                                        refetch={refetch}
                                    />
                                )
                            }
                        </AnimatePresence>
                    </>
                )
            }
        </Hoverable>
    )
}

const CameraFallbackRender = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
    return (
        <div className={cn(CameraWrapper())}>
            <Error onClick={resetErrorBoundary} />
        </div>
    )
};

const CameraErrorBoundary: FC<CameraProps> = ({ camera, ...props }) => {
    const { reset } = useQueryErrorResetBoundary();

    return (
        <Suspense
            fallback={
                <div className={cn(CameraWrapper())}>
                    <Loader />
                </div>
            }
        >
            <ErrorBoundary
                onReset={reset}
                fallbackRender={CameraFallbackRender}
            >
                <Camera
                    camera={camera}
                    {...props}
                />
            </ErrorBoundary>
        </Suspense>
    )
}

export default CameraErrorBoundary;  