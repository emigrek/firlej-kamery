import cams from '@/cameras'
import jsxToString from '@/utils/jsxToString';
import { Marker } from '@react-google-maps/api'
import { FC } from 'react'
import { TbDeviceCctv } from 'react-icons/tb';

import "./Markers.css";

const Markers: FC = () => {
    return cams.map(({ id, position, name }) => (
        <Marker
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
    ))
}

export default Markers