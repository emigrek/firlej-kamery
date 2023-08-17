import { FC, useState } from 'react'
import Modal from "react-modal";
import { customStyles } from '@client/components/modals/shared';
import { MdClose, MdRefresh } from 'react-icons/md';
import Camera from '@client/components/ui/Camera';
import { Button } from '@client/components/ui/Button';
import { IconType } from 'react-icons/lib';
import useMapStore from '@client/stores/mapStore';
import { usePlayerStore, PlaybackAction } from '@client/stores/playerStore';
import { useQueryClient } from '@tanstack/react-query';
import { useCameraModal } from '@client/hooks/useCameraModal';
import { useLocation, useNavigate } from 'react-router-dom';

const CameraModal: FC = () => {
    const [random, setRandom] = useState<number>(Math.random());

    const queryClient = useQueryClient();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const { map } = useMapStore();
    const { isOpen, camera, zoom } = useCameraModal();
    const { setIndex, setState } = usePlayerStore();

    const handleRefresh = () => {
        setRandom(Math.random());
        queryClient.invalidateQueries([camera?.id]);
    };

    const handleCameraModalClose = () => {
        map?.setZoom(zoom);
        navigate(pathname.split('/camera').at(0) || '/');
        setIndex(0);
        setState(PlaybackAction.Stop);
    };

    if (!camera) return null;

    return (
        <Modal closeTimeoutMS={200} isOpen={isOpen} style={customStyles} onRequestClose={handleCameraModalClose}>
            <div className='flex flex-col gap-4'>
                <Camera
                    key={random}
                    camera={camera}
                />
                <div className='flex flex-col items-center justify-between gap-8 px-4 md:flex-row'>
                    <h1 className='z-10 w-full text-4xl font-bold text-left md:text-5xl text-neutral-100'>{camera.name}</h1>
                    <Button className='w-full md:w-auto' size={'large'} variant={'transparent'} iconLeft={MdClose as IconType} onClick={handleCameraModalClose}>
                        Zamknij
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default CameraModal