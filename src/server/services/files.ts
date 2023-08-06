import fs from "fs";
import path from "path";

import { Snapshot } from "@server/models/Snapshot";
import { validCameraIds } from "@shared/cameras";

export class Files {
    public static IMAGES_PATH = path.join(__dirname, '..', '..', '..', 'images');
    public static EXPIRE_TIME = 1000 * 60 * 60 * 24 * 3;

    public static save = (snapshot: Snapshot) => {
        const path = `${Files.IMAGES_PATH}/${snapshot.cameraId}`;

        !fs.existsSync(path) && fs.mkdirSync(path);
        fs.writeFileSync(`${path}/${snapshot.filename}.jpg`, snapshot.buffer);
    }

    public static getCameraSnapshots = (cameraId: number): Snapshot[] => {
        const path = `${Files.IMAGES_PATH}/${cameraId}`;
        if (!fs.existsSync(path)) {
            return [];
        }

        const files = fs.readdirSync(path);
        const snapshots = files.map((name: string) => {
            const filename = name.replace('.jpg', '');
            const buffer = fs.readFileSync(`${path}/${filename}.jpg`);
            const { birthtimeMs: timestamp } = fs.statSync(`${path}/${filename}.jpg`);

            return new Snapshot({
                id: filename,
                cameraId,
                timestamp,
                buffer
            });
        });

        return snapshots;
    }

    public static getCameraSnapshot = (cameraId: number, id: string): Snapshot | undefined => {
        const path = `${Files.IMAGES_PATH}/${cameraId}`;
        if (!fs.existsSync(path)) {
            return;
        }
        const snapshots = Files.getCameraSnapshots(cameraId);
        return snapshots.find((snapshot) => snapshot.id === id);
    }

    public static getAll = (): Snapshot[] => {
        const snapshots: Snapshot[] = [];

        validCameraIds.forEach((id) => {
            snapshots.push(...Files.getCameraSnapshots(id));
        });

        return snapshots;
    }

    public static expire = () => {
        const snapshots = Files.getAll();
        const now = Date.now();

        for (const snapshot of snapshots) {
            if (snapshot.timestamp < now - Files.EXPIRE_TIME) {
                Files.delete(snapshot);
            }
        }
    }

    public static delete = (snapshot: Snapshot) => {
        const path = `${Files.IMAGES_PATH}/${snapshot.path}`;
        fs.unlinkSync(path);
    }
}