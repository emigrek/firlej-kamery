import cams from '@/cameras'
import { FC } from 'react'

import Camera from './Camera';

const Cameras: FC = () => {
    return cams.map((camera) => (
        <Camera key={camera.id} {...camera} />
    ))
}

export default Cameras;