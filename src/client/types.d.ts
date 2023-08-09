interface Snapshot {
    cameraId: number;
    timestamp: number;
    url: string;
    latest?: boolean;
}

interface SnapshotFilter {
    label: string;
    function: (snapshot: Snapshot) => boolean;
}