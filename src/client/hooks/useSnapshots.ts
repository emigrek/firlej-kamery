import { fetchSnapshots } from "@client/queries/snapshots"
import { Camera } from "@shared/cameras";
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react";

export const useSnapshots = (camera: Camera) => {
    const { data, ...rest } = useQuery({
        queryKey: [camera.id],
        queryFn: () => fetchSnapshots(camera.id),
    });
    const latest = {
        cameraId: camera.id,
        timestamp: Date.now(),
        url: camera.url,
        latest: true
    };

    const snapshots = useMemo(() => {
        return [...(data || []), latest]
            .sort((a, b) => a.timestamp - b.timestamp);
    }, [data]);

    return {
        data: snapshots,
        ...rest
    }
};