import cams from '@/cameras'
import { FC } from 'react'
import Marker from './Marker'

import "./Markers.css";

const Markers: FC = () => {
    return cams.map((camera) => (
        <Marker key={camera.id} camera={camera} />
    ))
}

export default Markers;