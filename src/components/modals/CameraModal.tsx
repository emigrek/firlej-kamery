import { FC } from 'react'
import Modal from "react-modal";
import useCameraModalStore from '@/stores/cameraModalStore';
import useMapStore from '@/stores/mapStore';
import { customStyles } from '@/components/modals/shared';

import Camera from '@/components/Camera';
import { TbDeviceCctv } from 'react-icons/tb';

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
                <h1 className="flex items-center justify-center gap-2 text-xl font-bold text-center md:text-3xl text-tulip-tree-400">
                    {camera?.name}
                    <TbDeviceCctv className="stroke-current w-7 h-7 fill-neutral-950/70 md:w-8 md:h-8" />
                </h1>
                <div className='relative w-full h-52 md:h-96 lg:h-[35rem]'>
                    <Camera {...camera}/>
                </div>
            </div>
        </Modal>
    )
}

export default CameraModal