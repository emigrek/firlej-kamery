import { FC, HTMLAttributes, ReactNode, useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import Loader from '@client/components/Loader';
import Error from '@client/components/Error';

import { useTimer } from "react-use-precision-timer";
import cn from '@client/utils/cn';

interface SnapshotProps extends HTMLAttributes<HTMLDivElement> {
    snapshot: Snapshot
    autoRefresh?: boolean
    zoomable?: boolean
}

const REFRESH_INTERVAL = 1000 * 60 * 1;

const Wrapper = ({ children, zoomable }: { children: ReactNode, zoomable?: boolean }) => {
    return zoomable ? (
        <TransformWrapper>
            <TransformComponent>
                {children}
            </TransformComponent>
        </TransformWrapper>
    ) : (
        <>
            {children}
        </>
    )
};

const Snapshot: FC<SnapshotProps> = ({ snapshot, zoomable, autoRefresh, onClick, ...props }) => {
    const { url, cameraId, latest } = snapshot;

    const [date, setDate] = useState(Date.now);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useTimer({
        delay: REFRESH_INTERVAL,
        startImmediately: autoRefresh || false,
    }, () => {
        setDate(Date.now);
    });

    const handleRefresh = () => {
        setLoading(true);
        setError(false);
        setDate(Date.now);
    }

    const handleLoad = () => {
        setError(false);
        setLoading(false);
    }

    const handleError = () => {
        setError(true);
    }

    return (
        <div {...props}>
            <div className={cn(zoomable && 'cursor-grab', 'relative w-full overflow-hidden aspect-video rounded-lg bg-neutral-900')}>
                <AnimatePresence>
                    {(loading && !error) && <Loader />}
                    {error && <Error onClick={handleRefresh} />}
                </AnimatePresence>
                <Wrapper zoomable={zoomable}>
                    <img
                        key={date}
                        style={{
                            opacity: error ? 0 : 100
                        }}
                        src={
                            latest ? `${url}?d=${date}` : url
                        }
                        onClick={onClick}
                        onLoad={handleLoad}
                        onError={handleError}
                        alt={`camera-${cameraId}`}
                        className="w-full h-full rounded-lg"
                    />
                </Wrapper>
            </div>
        </div>
    )
}

export default Snapshot