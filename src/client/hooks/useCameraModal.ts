import cameras from "@shared/cameras";
import { useLocation, useSearchParams } from "react-router-dom";

export const useCameraModal = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    const cameraName = decodeURIComponent(pathname.split("/")[3] || pathname.split("/")[2]);
    const camera = cameras.find(({ name }) => name.toLowerCase() === cameraName?.toLowerCase());
    const zoom = Number(searchParams.get("zoom")) || 14;

    return {
        isOpen: Boolean(camera),
        camera,
        zoom
    }
};