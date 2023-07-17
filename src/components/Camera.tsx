import { FC, useState, HTMLAttributes } from 'react'
import { Camera } from '@/cameras'

import Loader from '@/components/Loader';
import Error from '@/components/Error';

import { AnimatePresence } from 'framer-motion';

interface CameraProps extends HTMLAttributes<HTMLDivElement> {
    camera: Camera;
    onLoad?: () => void;
}

const Camera: FC<CameraProps> = ({ camera, onLoad }) => {
    const { name, url } = camera;
    const [random, setRandom] = useState(Math.random());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleRefresh = () => {
        setError(false);
        setLoading(true);
        setRandom(Math.random());
    }

    const handleLoad = () => {
        onLoad?.();
        setLoading(false);
    }

    return (
        <div onClick={handleRefresh} className='relative w-full p-[1px] overflow-hidden rounded-lg cursor-pointer aspect-video bg-transparent'>
            <AnimatePresence>
                {(loading && !error) && <Loader />}
                {error && <Error />}
            </AnimatePresence>
            <img style={{
                opacity: error ? 0 : 100
            }} src={`${url}?r=${random}`} onLoad={handleLoad} onError={() => setError(true)} alt={name} className="w-full h-full rounded-lg" />
        </div>
    )
}

export default Camera;