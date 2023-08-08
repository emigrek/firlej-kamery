import { fetchSnapshots } from "@client/queries/snapshots"
import cameras, { Camera } from "@shared/cameras";
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react";

export const useSnapshots = (camera: Camera) => {
    const { data, ...rest } = useQuery({
        queryKey: ["snapshots", camera.id],
        queryFn: () => fetchSnapshots(camera.id),
    });
    const latest = {
        cameraId: camera.id,
        timestamp: Date.now(),
        url: camera.url,
    };
    
    const snapshots = useMemo(() => {
        return [...(data || []), latest]
            .sort((a, b) => a.timestamp - b.timestamp);
    }, [data]);

    return {
        snapshots,
        ...rest
    }
};