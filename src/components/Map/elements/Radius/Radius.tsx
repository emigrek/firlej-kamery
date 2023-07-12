import { Camera } from '@/cameras'
import { Circle } from '@react-google-maps/api';
import { FC, memo } from 'react'

interface RadiusProps {
    camera: Camera;
}

const Radius: FC<RadiusProps> = ({ camera }) => {
    const { id, position } = camera;

    return (
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
    )
}

const Memoized = memo(Radius);
export default Memoized;