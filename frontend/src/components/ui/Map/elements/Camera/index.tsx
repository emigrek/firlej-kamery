import { Camera } from '@/cameras'
import jsxToString from '@/utils/jsxToString';
import { CircleF, MarkerF } from '@react-google-maps/api';
import { FC, memo } from 'react'
import { TbDeviceCctv } from 'react-icons/tb';
import colors from 'tailwindcss/colors';

import "./Camera.css";
import useMapStore from '@/stores/mapStore';
import useCameraModalStore from '@/stores/cameraModalStore';

const markerSize = 28;

interface CameraProps {
    camera: Camera
}

const Camera: FC<CameraProps> = ({ camera }) => {
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
            <MarkerF
                position={position}
                onClick={handleCameraClick}
                options={{
                    label: {
                        text: name,
                        color: colors.neutral[300],
                        className: "marker-label"
                    },
                    anchorPoint: new window.google.maps.Point(0, 15),
                    zIndex: 1000
                }}
                icon={{
                    url: jsxToString(
                        <TbDeviceCctv stroke={colors.neutral[200]} fill={`${colors.neutral[950]}CC`} size={markerSize} />
                    ),
                    scaledSize: new window.google.maps.Size(markerSize, markerSize),
                    anchor: new window.google.maps.Point(markerSize / 2, markerSize / 2),
                }}
            />
            <CircleF
                center={position}
                onClick={handleCameraClick}
                radius={100}
                options={{
                    strokeWeight: 0,
                    fillColor: colors.neutral[100],
                    fillOpacity: 0.05,
                    zIndex: 999
                }}
            />
        </>
    )
}

const Memoized = memo(Camera);
export default Memoized;