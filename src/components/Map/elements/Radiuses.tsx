import cams from '@/cameras'
import { FC } from 'react'

import Radius from './Radius'

const Radiuses: FC = () => {
    return cams.map(( camera ) => (
        <Radius key={camera.id} camera={camera} />
    ))
}

export default Radiuses