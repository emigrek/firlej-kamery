import { Camera } from "@server/models/Camera";
import { Task } from "@server/models/Task";
import { Files } from "@server/services";
import { validCameraIds } from "@shared/cameras";

export const snapshot: Task = {
    name: "snapshot",
    cron: "*/30 * * * *",
    execute: async () => {
        const snapshotPromises = validCameraIds.map(async (id) => {
            const camera = new Camera(id);
            const snapshot = await camera.snapshot();

            if (!snapshot) {
                return;
            }
            
            Files.save(snapshot);
        });

        await Promise.all(snapshotPromises)
            .then(() => console.log('Snapshot task finished'))
            .catch((error) => console.error(`Error while executing snapshot task: ${error}`));
    }
};