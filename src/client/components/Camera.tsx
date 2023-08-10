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
    const { setSnapshots, setFilteredSnapshots, snapshot, setSnapshot, filter, clear } = useCameraStore();

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
        <div className='relative flex flex-col group/camera'>
            <Snapshot
                snapshot={snapshot || defaultSnapshot}
                zoomable
                {...props}
            />
            <Player
                className="z-30 absolute transition-opacity duration-200 opacity-0 inset-x-3 bottom-[0.40rem] rounded-b-lg group-hover/camera:opacity-100"
                defaultSnapshot={defaultSnapshot}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
        </div>
    )
}

export default Camera;  