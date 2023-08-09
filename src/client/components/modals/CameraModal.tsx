import { FC, useState } from 'react'
import Modal from "react-modal";
import useCameraModalStore from '@client/stores/cameraModalStore';
import useMapStore from '@client/stores/mapStore';
import { customStyles } from '@client/components/modals/shared';
import { MdClose, MdRefresh } from 'react-icons/md';
import Camera from '@client/components/Camera';
import { Button } from '@client/components/ui/Button';
import { IconType } from 'react-icons/lib';
import { usePlayerState, PlaybackAction } from '@client/stores/playerStore';

const CameraModal: FC = () => {
    const { map } = useMapStore();
    const { isOpen, camera, setIsOpen, previousCameraZoom } = useCameraModalStore();
    const { setIndex, setState, state } = usePlayerState();
    const [random, setRandom] = useState<number>(Math.random());

    const handleRefresh = () => {
        setRandom(Math.random());
    };

    const handleCameraModalClose = () => {
        map?.setZoom(previousCameraZoom);
        setIsOpen(false);
        setIndex(0);
        setState(PlaybackAction.Stop);
    };

    if (!camera) return null;

    return (
        <Modal closeTimeoutMS={200} isOpen={isOpen} style={customStyles} onRequestClose={handleCameraModalClose}>
            <div className='flex flex-col gap-6'>
                <Camera
                    key={random}
                    className='px-3 w-screen h-auto lg:w-auto lg:h-[60vh] aspect-video relative flex items-center'
                    camera={camera}
                />
                <div className='flex flex-col gap-5 px-3 md:items-center md:justify-between md:flex-row'>
                    <div className='flex flex-col flex-grow gap-2 text-left'>
                        <h1 className='text-3xl font-bold md:text-4xl text-neutral-100'>{camera.name}</h1>
                        <a className='text-xs md:text-sm text-neutral-500'>{camera.position.lat}, {camera.position.lng}</a>
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