import { Camera } from "@/models/Camera";
import { Task } from "@/models/Task";
import { Cache, Files } from "@/services";
import { validCameraIds } from "@/utils";

export const snapshot: Task = {
    name: "snapshot",
    cron: "0 * * * *",
    execute: async () => {
        Files.deleteOld();

        const snapshotPromises = validCameraIds.map(async (id) => {
            const camera = new Camera(id);
            const image = await camera.snapshot();

            Files.save(image);
            Cache.add(id, image);
        });

        await Promise.all(snapshotPromises)
            .then(() => console.log('Snapshot task finished'))
            .catch((error) => console.error(`Error while executing snapshot task: ${error}`));
    }
};