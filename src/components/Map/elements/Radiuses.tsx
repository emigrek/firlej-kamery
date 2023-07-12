import cams from '@/cameras'
import { Circle } from '@react-google-maps/api'
import { FC } from 'react'

const Radiuses: FC = () => {
    return cams.map(({ id, position }) => (
        <Circle
            key={id}
            center={position}
            radius={100}
            options={{
                strokeWeight: 0,
                fillColor: '#eaa540',
                fillOpacity: 0.1
            }}
        />
    ))
}

export default Radiuses