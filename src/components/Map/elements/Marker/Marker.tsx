import { Camera } from '@/cameras';
import jsxToString from '@/utils/jsxToString';
import { Marker as M } from '@react-google-maps/api';
import { FC, memo } from 'react'
import { TbDeviceCctv } from 'react-icons/tb';

interface MarkerProps {
    camera: Camera
}

const Marker: FC<MarkerProps> = ({ camera }) => {
    const { id, position, name } = camera;

    return (
        <M
            key={id}
            position={position}
            options={{
                label: {
                    text: name,
                    color: "#eaa540",
                    className: "marker-label"
                },
                anchorPoint: new window.google.maps.Point(0, 15)
            }}
            icon={{
                url: jsxToString(
                    <TbDeviceCctv stroke="#eaa540" fill="#171717" size={24} />
                ),
                scaledSize: new window.google.maps.Size(24, 24),
                anchor: new window.google.maps.Point(12, 12)
            }}
        />
    )
}

const Memoized = memo(Marker);

export default Memoized;