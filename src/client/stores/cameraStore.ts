import { create } from "zustand";
import { filters } from "@shared/filters";

interface CameraState {
    snapshot: Snapshot | null;
    setSnapshot: (snapshot: Snapshot | null) => void;
    snapshots: Snapshot[];
    setSnapshots: (snapshots: Snapshot[]) => void;
    filteredSnapshots: Snapshot[];
    setFilteredSnapshots: (snapshots: Snapshot[]) => void;
    filter: SnapshotFilter;
    setFilter: (filter: SnapshotFilter) => void;
    clear: () => void;
}

const useCameraStore = create<CameraState>(set => ({
    snapshot: null,
    setSnapshot: (snapshot: Snapshot | null) => set({ snapshot }),
    snapshots: [],
    setSnapshots: (snapshots: Snapshot[]) => set({ snapshots }),
    filteredSnapshots: [],
    setFilteredSnapshots: (snapshots: Snapshot[]) => set({ filteredSnapshots: snapshots }),
    filter: filters.at(0)!,
    setFilter: (filter: SnapshotFilter) => set({ filter }),
    clear: () => set({
        snapshot: null,
        snapshots: [],
        filteredSnapshots: [],
        filter: filters.at(0)!
    })
}));

export default useCameraStore;