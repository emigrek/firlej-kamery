import cameras from "@shared/cameras";
import { useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const useCameraDrawer = () => {
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();

    const camera = useMemo(() => {
        const cameraName = decodeURIComponent(pathname.split("/")[3] || pathname.split("/")[2]);
        return cameras.find(({ name }) => name.toLowerCase() === cameraName.toLowerCase());
    }, [pathname]);
    const isOpen = useMemo(() => Boolean(camera), [camera]);
    const zoom = Number(searchParams.get("zoom")) || 14;

    return {
        isOpen,
        camera,
        zoom
    }
};