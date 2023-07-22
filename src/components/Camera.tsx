import { FC, useState, HTMLAttributes, useEffect, useMemo } from 'react'
import { Camera } from '@/cameras'

import Loader from '@/components/Loader';
import Error from '@/components/Error';

import { AnimatePresence } from 'framer-motion';
import useCameraModalStore from '@/stores/cameraModalStore';
import cn from '@/utils/cn';

interface CameraProps extends HTMLAttributes<HTMLDivElement> {
    camera: Camera;
    openModalOnClick?: boolean;
    onLoad?: () => void;
}

const REFRESH_INTERVAL = 1000 * 60 * 5;

const Camera: FC<CameraProps> = ({ camera, onLoad, openModalOnClick }) => {
    const { name, url } = camera;
    const { setIsOpen, setCamera } = useCameraModalStore();
    const [date, setDate] = useState(Date.now);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

    const cameraUrl = useMemo(() => `${url}?d=${date}`, [url, date]);

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

    useEffect(() => {
        if (!refreshInterval) {
            setRefreshInterval(setInterval(() => {
                setDate(Date.now);
            }, REFRESH_INTERVAL));
        }

        return () => {
            if (refreshInterval) {
                clearInterval(refreshInterval);
            }
        }
    }, [refreshInterval]);

    return (
        <div
            className={cn(
                "relative w-full p-[1px] overflow-hidden rounded-lg aspect-video bg-neutral-900",
                openModalOnClick && "cursor-pointer"
            )}
        >
            <AnimatePresence>
                {(loading && !error) && <Loader />}
                {error && <Error onClick={handleRefresh} />}
            </AnimatePresence>
            <img
                onClick={handleOpenModal}
                style={{
                    opacity: error ? 0 : 100
                }}
                src={cameraUrl}
                onLoad={handleLoad}
                onError={handleError}
                alt={name}
                className="w-full h-full rounded-lg"
            />
        </div>
    )
}

export default Camera;  