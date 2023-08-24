interface Snapshot {
    cameraId: number;
    timestamp: number;
    url: string;
}

interface SnapshotFilter {
    label: string;
    function: (snapshot: Snapshot) => boolean;
}