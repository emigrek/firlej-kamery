import { MapOptions } from "google-map-react";
import styles from "./styles";

const options: MapOptions = {
    // gestureHandling: "none",
    backgroundColor: "#171717",
    disableDefaultUI: true,
    styles: styles,
    zoomControl: true,
    minZoom: 14,
    maxZoom: 16
}

export default options;