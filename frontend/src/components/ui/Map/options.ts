import { MapOptions } from "google-map-react";
import styles from "./styles";

const options: MapOptions = {
    backgroundColor: "#171717",
    disableDefaultUI: true,
    styles: styles,
    zoomControl: false,
    minZoom: 14,
    maxZoom: 18
}

export default options;