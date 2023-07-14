import { Camera } from "@/cameras";
import { create } from "zustand";

interface CameraModalState {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    previousCameraZoom: number;
    setPreviousCameraZoom: (previousCameraZoom: number) => void;
    camera: Camera | null;
    setCamera: (camera: Camera) => void;
}

const useCameraModalStore = create<CameraModalState>(set => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen }),
    previousCameraZoom: 0,
    setPreviousCameraZoom: (previousCameraZoom: number) => set({ previousCameraZoom }),
    camera: null,
    setCamera: (camera: Camera) => set({ camera })
}));

export default useCameraModalStore;