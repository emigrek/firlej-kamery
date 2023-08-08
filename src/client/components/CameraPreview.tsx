import { FC, HTMLAttributes } from 'react'
import cn from '@client/utils/cn';
import { Camera as CameraInterface } from '@shared/cameras'

import Snapshot from '@client/components/Snapshot';
import useCameraModalStore from '@client/stores/cameraModalStore';

import { useQueryClient } from '@tanstack/react-query';
import { fetchSnapshots } from '@client/queries/snapshots';

interface CameraPreviewProps extends HTMLAttributes<HTMLDivElement> {
    camera: CameraInterface;
}

const CameraPreview: FC<CameraPreviewProps> = ({ camera }) => {
    const { id } = camera;

    const queryClient = useQueryClient();
    const { setIsOpen, setCamera } = useCameraModalStore();

    const handleCameraPreviewClick = () => {
        queryClient.prefetchQuery({
            queryKey: ['snapshots', id],
            queryFn: () => fetchSnapshots(id),
        });

        setCamera(camera);
        setIsOpen(true);
    }

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden rounded-lg aspect-video bg-neutral-900 cursor-pointer"
            )}
        >
            <Snapshot
                onClick={handleCameraPreviewClick}
                snapshot={{
                    cameraId: id,
                    timestamp: Date.now(),
                    url: camera.url
                }}
                autoRefresh
            />
        </div>
    )
}

export default CameraPreview;  