import { FC, HTMLAttributes, useEffect } from 'react';
import { Camera as CameraInterface } from '@shared/cameras';

import Snapshot from '@client/components/Snapshot';
import Player from '@client/components/ui/Player';

import { useSnapshots } from '@client/hooks/useSnapshots';
import useCameraStore from '@client/stores/cameraStore';

interface CameraProps extends HTMLAttributes<HTMLDivElement> {
    camera: CameraInterface;
}

const Camera: FC<CameraProps> = ({ camera, ...props }) => {
    const { id } = camera;

    const defaultSnapshot = {
        cameraId: id,
        timestamp: Date.now(),
        url: camera.url,
        latest: true
    };
    const { data, isLoading, isError, refetch } = useSnapshots(camera);
    const { setSnapshots, setFilteredSnapshots, snapshot, setSnapshot, filter, setFilter, clear } = useCameraStore();

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
        <div className='flex flex-col'>
            <Snapshot
                snapshot={snapshot || defaultSnapshot}
                zoomable
                {...props}
            />
            <Player
                defaultSnapshot={defaultSnapshot}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
        </div>
    )
}

export default Camera;  