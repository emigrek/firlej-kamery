import { FC, useState, HTMLAttributes, useMemo } from 'react';
import { Camera as CameraInterface } from '@shared/cameras';

import Snapshot from '@client/components/Snapshot';
import Player from '@client/components/ui/Player';

import { useSnapshots } from '@client/hooks/useSnapshots';

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
    const [snapshot, setSnapshot] = useState<Snapshot>(defaultSnapshot);
    const { snapshots, isLoading, isError, refetch } = useSnapshots(camera);

    return (
        <div className='flex flex-col gap-1'>
            <div {...props}>
                <Snapshot
                    snapshot={snapshot}
                    zoomable
                />
            </div>
            <Player
                snapshots={snapshots}
                snapshot={snapshot}
                setSnapshot={setSnapshot}
                defaultSnapshot={defaultSnapshot}
                isLoading={isLoading}
                isError={isError}
                refetch={refetch}
            />
        </div>
    )
}

export default Camera;  