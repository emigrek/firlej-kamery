import { FC } from 'react'
import Modal from "react-modal";
import useCameraModalStore from '@/stores/cameraModalStore';
import useMapStore from '@/stores/mapStore';
import { customStyles } from '@/components/modals/shared';

import Camera from '@/components/Camera';

const CameraModal: FC = () => {
    const { map } = useMapStore();
    const { isOpen, camera, setIsOpen, previousCameraZoom } = useCameraModalStore();

    const handleCameraModalClose = () => {
        map?.setZoom(previousCameraZoom);
        setIsOpen(false);
    };

    if (!camera) return null;

    return (
        <Modal closeTimeoutMS={200} isOpen={isOpen} style={customStyles} onRequestClose={handleCameraModalClose}>
            <div className='flex flex-col gap-1 py-4'>
                <div className='relative px-2 lg:w-auto w-screen lg:h-[50vh] aspect-video'>
                    <Camera camera={camera} />
                </div>
                <div className='flex flex-col gap-2 px-5'>
                    <h1 className='text-4xl font-bold text-neutral-100'>Plaża {camera.name}</h1>
                    <a className='text-sm text-neutral-500'>{camera.position.lat}, {camera.position.lng}</a>
                </div>
            </div>
        </Modal>
    )
}

export default CameraModal