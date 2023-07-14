import { Camera } from '@/cameras'
import jsxToString from '@/utils/jsxToString';
import { Circle, Marker } from '@react-google-maps/api';
import { FC, memo } from 'react'
import { TbDeviceCctv } from 'react-icons/tb';

import "./Camera.css";
import useMapStore from '@/stores/mapStore';
import useCameraModalStore from '@/stores/cameraModalStore';

const markerSize = 28;

const Camera: FC<Camera> = (camera) => {
    const { name, position } = camera;

    const { map } = useMapStore();
    const { setIsOpen, setCamera, setPreviousCameraZoom } = useCameraModalStore();

    const handleCameraClick = () => {
        setCamera(camera);
        setPreviousCameraZoom(map?.getZoom() || 14);
        map?.panTo(position);
        map?.setCenter(position);
        map?.setZoom(18);
        setTimeout(() => {
            setIsOpen(true);
        }, 500)
    };
    
    return (
        <>
            <Marker
                position={position}
                onClick={handleCameraClick}
                options={{
                    label: {
                        text: name,
                        color: "#edb95c",
                        className: "marker-label"
                    },
                    anchorPoint: new window.google.maps.Point(0, 15),
                    zIndex: 1000
                }}
                icon={{
                    url: jsxToString(
                        <TbDeviceCctv stroke="#eaa540" fill="#171717CC" size={markerSize} />
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