import { FC } from 'react'
import cameras, { Camera as CameraInterface } from '@/cameras'

import Grid from '@/components/ui/Grid'
import Camera from '@/components/Camera'
import useCameraModalStore from '@/stores/cameraModalStore'

const GridView: FC = () => {
    const { setIsOpen, setCamera } = useCameraModalStore();

    const handleCameraClick = (camera: CameraInterface) => {
        setCamera(camera);
        setIsOpen(true);
        console.log("est");
    }

    return (
        <Grid>
            {
                cameras.map((camera, index) => (
                    <Grid.Cell onClick={() => handleCameraClick(camera)} key={index}>
                        <Camera camera={camera}/>
                    </Grid.Cell>
                ))
            }
        </Grid>
    )
}

export default GridView