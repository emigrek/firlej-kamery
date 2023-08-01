import fs from "fs";

import { Snapshot } from "@/models/Snapshot";
import { validCameraIds } from "@/utils";

export class Files {
    public static IMAGES_PATH = `${process.cwd()}\\images`;
    public static DELETE_TIME = 1000 * 60 * 60 * 24 * 7;

    public static save = (snapshot: Snapshot) => {
        const path = `${Files.IMAGES_PATH}\\${snapshot.cameraId}`;

        !fs.existsSync(path) && fs.mkdirSync(path);
        fs.writeFileSync(`${path}\\${snapshot.timestamp}.jpg`, snapshot.buffer);
    }

    public static get = (cameraId: number): Snapshot[] => {
        const path = `${Files.IMAGES_PATH}\\${cameraId}`;

        if (!fs.existsSync(path)) {
            return [];
        }

        const files = fs.readdirSync(path);
        const snapshots = files.map((name: string) => {
            const timestamp = parseInt(name.split('.').shift() || '');
            const buffer = fs.readFileSync(`${path}\\${name}`);
            return new Snapshot(cameraId, timestamp, buffer);
        });

        return snapshots;
    }

    public static getAll = (): Snapshot[] => {
        const snapshots: Snapshot[] = [];

        validCameraIds.forEach((id) => {
            snapshots.push(...Files.get(id));
        });

        return snapshots;
    }

    public static deleteOld = () => {
        const snapshots = Files.getAll();
        const now = Date.now();

        snapshots.forEach((snapshot) => {
            if (snapshot.timestamp < now - Files.DELETE_TIME) {
                const path = `${Files.IMAGES_PATH}\\${snapshot.cameraId}\\${snapshot.timestamp}.jpg`;
                fs.unlinkSync(path);
            }
        });
    }
}