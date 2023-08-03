import { FC, useState, HTMLAttributes, useEffect, useMemo } from 'react'
import { Camera as CameraInterface } from '@shared/cameras'

import Loader from '@client/components/Loader';
import Error from '@client/components/Error';

import { AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import useCameraModalStore from '@client/stores/cameraModalStore';
import cn from '@client/utils/cn';
import useTimer from '@client/hooks/useTimer';

interface CameraProps extends HTMLAttributes<HTMLDivElement> {
    camera: CameraInterface;
    openModalOnClick?: boolean;
    onLoad?: () => void;
}

const REFRESH_INTERVAL = 1000 * 60 * 5;

const Camera: FC<CameraProps> = ({ camera, onLoad, openModalOnClick }) => {
    const { name, id } = camera;
    const { setIsOpen, setCamera } = useCameraModalStore();
    const [date, setDate] = useState(Date.now);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useTimer(REFRESH_INTERVAL, () => {
        setDate(Date.now);
    });

    const handleOpenModal = () => {
        if (!openModalOnClick || error) return;

        setIsOpen(true);
        setCamera(camera);
    }

    const handleRefresh = () => {
        setLoading(true);
        setDate(Date.now);
    }

    const handleLoad = () => {
        onLoad?.();
        setError(false);
        setLoading(false);
    }

    const handleError = () => {
        setError(true);
    }

    return (
        <div
            className={cn(
                "relative w-full p-[1px] overflow-hidden rounded-lg aspect-video bg-neutral-900",
                openModalOnClick && "cursor-pointer",
                !openModalOnClick && "cursor-grab"
            )}
        >
            <AnimatePresence>
                {(loading && !error) && <Loader />}
                {error && <Error onClick={handleRefresh} />}
            </AnimatePresence>
            <div
                onClick={handleOpenModal}
            >
                <TransformWrapper
                    disabled={openModalOnClick}
                >
                    <TransformComponent>
                        <img
                            style={{
                                opacity: error ? 0 : 100
                            }}
                            src={`/api/camera/${id}/snapshot/latest?d=${date}`}
                            onLoad={handleLoad}
                            onError={handleError}
                            alt={name}
                            className="w-full h-full rounded-lg"
                        />
                    </TransformComponent>
                </TransformWrapper>
            </div>
        </div>
    )
}

export default Camera;  