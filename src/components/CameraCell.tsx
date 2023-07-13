import { FC, useMemo, useState } from 'react'
import Cell from './Grid/Cell'
import { Camera } from '@/cameras'
import Loader from './Loader';
import Error from './Error';

type CameraCellProps = Camera;

const CameraCell: FC<CameraCellProps> = ({ id, name }) => {
    const [random, setRandom] = useState(Math.random());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const url = useMemo(() => {
        return `http://jezioro.firlej.pl/images/Kamery/Kamera${id}.jpg?r=${random}`
    }, [id, random]);

    const handleRefresh = () => {
        setError(false);
        setLoading(true);
        setRandom(Math.random());
        setTimeout(() => setLoading(false), 500);
    }

    return (
        <Cell onClick={handleRefresh} className='relative rounded-lg cursor-pointer'>
            {loading && <Loader />}
            {error && <Error />}
            <img src={url} onLoad={() => setLoading(false)} onError={() => setError(true)} alt={name} className="w-full h-full rounded-lg" />
        </Cell>
    )
}

export default CameraCell