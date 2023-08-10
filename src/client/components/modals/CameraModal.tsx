import { FC, useState } from 'react'
import Modal from "react-modal";
import { customStyles } from '@client/components/modals/shared';
import { MdClose, MdRefresh } from 'react-icons/md';
import Camera from '@client/components/Camera';
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
    const { setIndex, setState, state } = usePlayerStore();

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
                    className='px-3 w-screen h-auto lg:w-auto lg:h-[60vh] aspect-video relative flex items-center'
                    camera={camera}
                />
                <div className='flex flex-col gap-10 px-4 md:items-center md:justify-between md:flex-row'>
                    <div className='flex flex-col flex-grow gap-2 text-left'>
                        <h1 className='text-3xl font-bold md:text-5xl text-neutral-100'>{camera.name}</h1>
                    </div>
                    <div className='flex flex-col-reverse items-center gap-2 md:flex-row'>
                        <Button variant={'transparent'} className='w-full md:w-auto' iconLeft={MdClose as IconType} onClick={handleCameraModalClose}>
                            Zamknij
                        </Button>
                        <Button
                            className='w-full md:w-auto' 
                            iconLeft={MdRefresh as IconType} 
                            onClick={handleRefresh}
                            disabled={state === PlaybackAction.Play}
                        >
                            Odśwież
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CameraModal