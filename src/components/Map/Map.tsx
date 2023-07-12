import { FC, memo, useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import options from './options';
import Markers from './elements/Markers';
import Radiuses from './elements/Radiuses';

const containerStyle = {
    width: '100vw',
    height: '100vh'
}

const center = {
    lat: 51.55408654852067,
    lng: 22.516873298793552
}

const Map: FC = () => {
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string
    });

    const render = () => {
        return (
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                center={center}
                onLoad={(map) => setMap(map)}
                zoom={14}
            >
                <Markers />
                <Radiuses />
            </GoogleMap>
        )
    }

    if (loadError) return <></>;

    return isLoaded ? render() : <></>;
}

const Memoized = memo(Map);

export default Memoized;