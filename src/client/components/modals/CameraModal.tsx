import { FC } from 'react'
import { MdClose } from 'react-icons/md';
import Camera from '@client/components/ui/Camera';
import { Button } from '@client/components/ui/Button';
import { IconType } from 'react-icons/lib';
import useMapStore from '@client/stores/mapStore';
import { usePlayerStore, PlaybackAction } from '@client/stores/playerStore';
import { useCameraModal } from '@client/hooks/useCameraModal';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Dialog from "@client/components/ui/Dialog";
import { AnimatePresence } from 'framer-motion';

const CameraModal: FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { map } = useMapStore();
    const { isOpen, camera, zoom } = useCameraModal();
    const { setIndex, setState } = usePlayerStore();

    const handleCameraModalClose = () => {
        map?.setZoom(zoom);
        navigate(pathname.split('/camera').at(0) || '/');
        setIndex(0);
        setState(PlaybackAction.Stop);
    };

    if (!camera) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={() => handleCameraModalClose()}>
            <Dialog.Overlay />
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal key={pathname} forceMount>
                        <Dialog.Content>
                            <h1 className='z-10 block w-full px-4 mt-3 text-4xl font-bold text-left md:hidden md:text-5xl text-neutral-100'>{camera.name}</h1>
                            <Camera
                                camera={camera}
                            />
                            <div className='flex flex-col items-center justify-between gap-8 px-4 md:px-8 md:flex-row'>
                                <h1 className='z-10 hidden w-full text-4xl font-bold text-left md:block md:text-5xl text-neutral-100'>{camera.name}</h1>
                                <Button className='w-full md:w-auto' size={'large'} variant={'transparent'} iconLeft={MdClose as IconType} onClick={handleCameraModalClose}>
                                    Zamknij
                                </Button>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    )
}

export default CameraModal