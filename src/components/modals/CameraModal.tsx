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
            <div className="flex flex-col gap-5">
                <h1 className="flex items-center justify-center gap-2 text-xl font-bold text-center md:text-3xl text-neutral-200">
                    {camera?.name}
                </h1>
                <div className='relative px-2 md:w-auto w-screen md:h-[60vh] aspect-video'>
                    <Camera camera={camera}/>
                </div>
            </div>
        </Modal>
    )
}

export default CameraModal