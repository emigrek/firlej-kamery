export const fetchSnapshots = async (cameraId: number): Promise<Snapshot[]> => {
    const response = await fetch(`/api/camera/${cameraId}`, {
        method: 'GET'
    });
    const data = await response.json();
    return data;
};