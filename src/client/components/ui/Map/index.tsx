import { FC, memo, useCallback, useMemo } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import useMapStore from '@client/stores/mapStore';

import cameras from '@shared/cameras';

import Camera from './elements/Camera';
import Error from './error';
import Loader from './loader';
import options from './options';

const Map: FC = () => {
    const { map, setMap } = useMapStore();
    const defaultCenter = useMemo(() => ({
        lat: 51.55408654852067,
        lng: 22.516873298793552
    }), []);

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string
    });

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, [setMap]);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, [setMap]);

    const handleCenterChange = useCallback(() => {
        const center = map?.getCenter();

        if (center) {
            const lat = center.lat();
            const lng = center.lng();

            if (lat > defaultCenter.lat + 0.1 || lat < defaultCenter.lat - 0.1 || lng > defaultCenter.lng + 0.1 || lng < defaultCenter.lng - 0.1) {
                map?.panTo(defaultCenter);
            }
        }
    }, [map, defaultCenter]);

    if (loadError) return <Error />;

    if (!isLoaded) return <Loader />;

    return (
        <GoogleMap
            mapContainerStyle={{
                width: '100vw',
                height: '100vh'
            }}
            options={options}
            center={defaultCenter}
            onCenterChanged={handleCenterChange}
            zoom={14}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {
                cameras.map((camera) => (
                    <Camera key={camera.id} camera={camera} />
                ))
            }
        </GoogleMap>
    )
}

const Memoized = memo(Map);
export default Memoized;