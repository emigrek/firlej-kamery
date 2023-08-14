import { FC, HTMLAttributes, useEffect } from 'react';
import { Camera as CameraInterface } from '@shared/cameras';

import Snapshot from '@client/components/Snapshot';
import Player from '@client/components/ui/Player';
import Hoverable from '@client/components/Hoverable';

import { useSnapshots } from '@client/hooks/useSnapshots';
import useCameraStore from '@client/stores/cameraStore';

import { AnimatePresence } from 'framer-motion';

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
        <Hoverable className='relative flex flex-col group/camera'>
            {
                (isHovered, isTouch) => (
                    <>
                        <Snapshot
                            snapshot={snapshot || defaultSnapshot}
                            zoomable
                            {...props}
                        />
                        <AnimatePresence>
                            {
                                (isHovered || isTouch) && (
                                    <Player
                                        className="z-30 absolute inset-x-3 bottom-[0.40rem] rounded-b-lg"
                                        defaultSnapshot={defaultSnapshot}
                                        isLoading={isLoading}
                                        isError={isError}
                                        refetch={refetch}
                                    />
                                )
                            }
                        </AnimatePresence>
                    </>
                )
            }
        </Hoverable>
    )
}

export default Camera;  