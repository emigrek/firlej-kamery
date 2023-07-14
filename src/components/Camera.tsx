import { FC, useState } from 'react'
import { Camera } from '@/cameras'

import Loader from '@/components/Loader';
import Error from '@/components/Error';

import { AnimatePresence } from 'framer-motion';

type CameraProps = Camera & {
    onLoad?: () => void;
};

const Camera: FC<CameraProps> = ({ name, url, onLoad }) => {
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
        setTimeout(() => {
            setLoading(false);
        }, 400);
    }

    return (
        <div onClick={handleRefresh} className='relative w-full h-full rounded-lg cursor-pointer'>
            <AnimatePresence>
                {(loading && !error) && <Loader />}
                {error && <Error />}
            </AnimatePresence>
            <img src={`${url}?r=${random}`} onLoad={handleLoad} onError={() => setError(true)} alt={name} width={1280} height={720} className="w-full h-full rounded-lg" />
        </div>
    )
}

export default Camera;