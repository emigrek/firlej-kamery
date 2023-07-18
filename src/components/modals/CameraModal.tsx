import { FC, useState } from 'react'
import Modal from "react-modal";
import useCameraModalStore from '@/stores/cameraModalStore';
import useMapStore from '@/stores/mapStore';
import { customStyles } from '@/components/modals/shared';
import { MdRefresh } from 'react-icons/md';
import Camera from '@/components/Camera';
import { Button } from '@/components/ui/Button';
import { IconType } from 'react-icons/lib';

const CameraModal: FC = () => {
    const { map } = useMapStore();
    const { isOpen, camera, setIsOpen, previousCameraZoom } = useCameraModalStore();
    const [random, setRandom] = useState<number>(Math.random());

    const handleRefresh = () => {
        setRandom(Math.random());
    };

    const handleCameraModalClose = () => {
        map?.setZoom(previousCameraZoom);
        setIsOpen(false);
    };

    if (!camera) return null;

    return (
        <Modal closeTimeoutMS={200} isOpen={isOpen} style={customStyles} onRequestClose={handleCameraModalClose}>
            <div className='flex flex-col gap-3 py-4'>
                <div className='relative px-2 lg:w-auto w-screen lg:h-[50vh] aspect-video'>
                    <Camera key={random} camera={camera} />
                </div>
                <div className='flex flex-col gap-4 px-8 md:items-center md:justify-between md:flex-row'>
                    <div className='flex flex-col flex-grow gap-1 text-left md:gap-2'>
                        <h1 className='text-3xl font-bold md:text-4xl text-neutral-100'>Plaża {camera.name}</h1>
                        <a className='text-xs md:text-sm text-neutral-500'>{camera.position.lat}, {camera.position.lng}</a>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                        <Button className='w-full md:w-auto' iconRight={MdRefresh as IconType} onClick={handleRefresh}>
                            Odśwież
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CameraModal