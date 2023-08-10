import { Camera as CameraInterface } from '@shared/cameras'
import jsxToString from '@client/utils/jsxToString';
import { CircleF, MarkerF } from '@react-google-maps/api';
import { FC, memo } from 'react'
import { TbDeviceCctv } from 'react-icons/tb';
import colors from 'tailwindcss/colors';

import "./Camera.css";
import useMapStore from '@client/stores/mapStore';
import { useLocation, useNavigate } from 'react-router-dom';

const markerSize = 28;

interface CameraProps {
    camera: CameraInterface
}

const Camera: FC<CameraProps> = ({ camera }) => {
    const { name, position } = camera;

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { map } = useMapStore();

    const handleCameraClick = () => {
        const previousZoom = map?.getZoom();

        map?.panTo(position);
        map?.setCenter(position);
        map?.setZoom(18);

        setTimeout(() => {
            navigate(
                `${pathname}/camera/${encodeURIComponent(name.toLowerCase())}${previousZoom ? '?' + new URLSearchParams({ zoom: previousZoom.toString() }).toString() : ''}`
            );
        }, 500);
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