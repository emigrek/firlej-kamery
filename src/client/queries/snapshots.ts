import axios from "axios";

export const fetchSnapshots = async (cameraId: number): Promise<Snapshot[]> => {
    const { data } = await axios.get(`/api/camera/${cameraId}`);
    return data;
};