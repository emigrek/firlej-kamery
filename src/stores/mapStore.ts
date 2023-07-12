import { create } from "zustand";

interface MapState {
    map: google.maps.Map | null;
    setMap: (map: google.maps.Map | null) => void;
}

const useMapStore = create<MapState>(set => ({
    map: null,
    setMap: (map: google.maps.Map | null) => set({ map })
}));

export default useMapStore;