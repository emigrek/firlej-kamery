export const fetchSnapshots = async (cameraId: number): Promise<Snapshot[]> => {
    const response = await fetch(`/api/camera/${cameraId}`);
    const data = await response.json();
    return data;
};