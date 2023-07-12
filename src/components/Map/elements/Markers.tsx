import cams from '@/cameras'
import { FC } from 'react'

import "./Markers.css";
import Marker from './Marker/Marker'

const Markers: FC = () => {
    return cams.map((camera) => (
        <Marker key={camera.id} camera={camera} />
    ))
}

export default Markers;