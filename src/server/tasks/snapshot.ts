import { Camera } from "@server/models/Camera";
import { Task } from "@server/models/Task";
import { Cache, Files } from "@server/services";
import { validCameraIds } from "@shared/cameras";

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