import { FC } from 'react'
import Camera from '@client/components/ui/Camera';
import useMapStore from '@client/stores/mapStore';
import { usePlayerStore, PlaybackAction } from '@client/stores/playerStore';
import { useCameraDrawer } from '@client/hooks/useCameraDrawer';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Drawer from "@client/components/ui/Drawer";

const CameraModal: FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { map } = useMapStore();
    const { isOpen, camera, zoom } = useCameraDrawer();
    const { setIndex, setState } = usePlayerStore();

    const handleCameraDrawerClose = () => {
        const rootRoute = pathname.split('/camera').at(0) || '/';

        map?.setZoom(zoom);
        setIndex(0);
        setState(PlaybackAction.Stop);

        navigate(rootRoute, {
            replace: true
        });
    };

    return (
        <Drawer.Root shouldScaleBackground open={isOpen} onOpenChange={handleCameraDrawerClose}>
            <Drawer.Portal>
                <Drawer.Overlay />
                <Drawer.Content className="flex-1 py-3 rounded-t-xl">
                    <Drawer.Grabber className='bg-primary-300' />
                    <div className="mx-auto mb-16 select-none md:mb-8">
                        {
                            camera && (
                                <>
                                    <Drawer.Title className="px-4 mb-3 text-3xl text-center md:text-4xl text-neutral-100">
                                        Plaża <span className="font-bold">{camera?.name}</span>
                                    </Drawer.Title>
                                    <Camera
                                        className='mx-2'
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