import { Camera } from '@/cameras'
import jsxToString from '@/utils/jsxToString';
import { Circle, Marker } from '@react-google-maps/api';
import { FC, memo } from 'react'
import { TbDeviceCctv } from 'react-icons/tb';

import "./Camera.css";
import useMapStore from '@/stores/mapStore';

const markerSize = 28;

const Camera: FC<Camera> = ({ name, position }) => {
    const { map } = useMapStore();

    const handleCameraClick = () => {
        map?.panTo(position);
        map?.setCenter(position);
        map?.setZoom(17);
    };
    
    return (
        <>
            <Marker
                position={position}
                onClick={handleCameraClick}
                options={{
                    label: {
                        text: name,
                        color: "#efba6c",
                        className: "marker-label"
                    },
                    anchorPoint: new window.google.maps.Point(0, 15),
                    zIndex: 1000
                }}
                icon={{
                    url: jsxToString(
                        <TbDeviceCctv stroke="#eaa540" fill="#171717AA" size={markerSize} />
                    ),
                    scaledSize: new window.google.maps.Size(markerSize, markerSize),
                    anchor: new window.google.maps.Point(markerSize/2, markerSize/2),
                }}
            />
            <Circle
                center={position}
                onClick={handleCameraClick}
                radius={100}
                options={{
                    strokeWeight: 0,
                    fillColor: '#eaa540',
                    fillOpacity: 0.05,
                    zIndex: 999
                }}
            />
        </>
    )
}

const Memoized = memo(Camera);
export default Memoized;