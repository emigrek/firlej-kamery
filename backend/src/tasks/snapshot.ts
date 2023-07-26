import fs from "fs";

import { Camera } from "@/models/Camera";
import { Task } from "@/models/Task";
import { Cache } from "@/services";
import { validIds } from "@/utils";

export const snapshot: Task = {
    name: "snapshot",
    cron: "0 * * * *",
    execute: async () => {
        const snapshotPromises = validIds.map(async (id) => {
            const camera = new Camera(id);
            const image = await camera.snapshot();
            const imageSavePath = `${process.cwd()}\\images\\${image.id}`;

            !fs.existsSync(imageSavePath) && fs.mkdirSync(imageSavePath);
            fs.writeFileSync(`${imageSavePath}\\${image.timestamp}.jpg`, image.buffer);
            Cache.set(image.id, image);
        });

        await Promise.all(snapshotPromises)
            .then(() => console.log('Snapshot task finished'))
            .catch((error) => console.error(`Error while executing snapshot task: ${error}`));
    }
};