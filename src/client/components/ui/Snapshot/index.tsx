import { FC, HTMLAttributes, ReactNode, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import Loader from './loader';
import Error from './error';

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

const Snapshot: FC<SnapshotProps> = ({ snapshot, zoomable, autoRefresh, onClick, className, ...props }) => {
    const { url, cameraId, latest } = snapshot;

    const [date, setDate] = useState(Date.now);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useTimer({
        delay: REFRESH_INTERVAL,
        startImmediately: autoRefresh || false,
    }, () => {
        setLoading(true);
        setDate(Date.now);
    });

    const handleRefresh = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
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
        <div 
            className={cn(zoomable && 'cursor-grab', 'relative w-full overflow-hidden aspect-video rounded-lg bg-neutral-900/30 backdrop-blur-sm p-[1px]', className)} 
            {...props}
        >
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
    )
}

export default Snapshot