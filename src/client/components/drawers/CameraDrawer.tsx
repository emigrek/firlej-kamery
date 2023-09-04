import { FC } from 'react'
import Camera from '@client/components/ui/Camera';
import useMapStore from '@client/stores/mapStore';
import { useCameraDrawer } from '@client/hooks/useCameraDrawer';
import { useNavigate } from 'react-router-dom';
import * as Drawer from "@client/components/ui/Drawer";
import { useRootPath } from '@client/hooks/useRootPath';

const CameraModal: FC = () => {
    const navigate = useNavigate();
    const { map } = useMapStore();
    const { isOpen, camera, zoom } = useCameraDrawer();
    const rootPath = useRootPath();

    const handleCameraDrawerClose = () => {
        map?.setZoom(zoom);
        navigate(rootPath, {
            replace: true
        });
    };

    return (
        <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={handleCameraDrawerClose}>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content className="flex-1 py-4">
                    <Drawer.Grabber />
                    <div className="mx-auto mb-4 md:mb-8">
                        {
                            camera && (
                                <>
                                    <Drawer.Title className="px-4 mb-4 text-3xl text-center md:text-4xl text-neutral-100">
                                        Plaża <span className="font-bold">{camera?.name}</span>
                                    </Drawer.Title>
                                    <Camera
                                        camera={camera}
                                    />
                                </>
                            )
                        }
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}

export default CameraModal