import axios from "axios";

import { Snapshot } from "@server/models/Snapshot";
import { Cache, Files } from "@server/services";

import { validCameraIds } from "@shared/cameras";
import { nanoid } from "nanoid";

export class Camera {
    public id: number;

    constructor(id: number) {
        if (!validCameraIds.includes(id)) {
            throw new Error('Invalid camera id');
        }

        this.id = id;
    }

    public snapshot = async (): Promise<Snapshot | undefined> => {
        const { id } = this;
        const { data } = await axios.get(this.url, { responseType: 'arraybuffer' })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Invalid response status');
                }
                return response;
            })
            .catch((error) => {
                throw error;
            });

        const buffer = Buffer.from(data, 'binary');
        const timestamp = Date.now();

        return new Snapshot({
            id: nanoid(),
            cameraId: id,
            timestamp,
            buffer
        });
    }

    public getSnapshots = async (): Promise<Snapshot[]> => {
        const { id } = this;
        const cached = Cache.getCameraSnapshots(id);

        if (!cached.length) {
            const snapshots = Files.getCameraSnapshots(id);
            Cache.set(snapshots);
            return snapshots;
        }

        return cached;
    }

    public getSnapshot = async (id: string): Promise<Snapshot | undefined> => {
        const { id: cameraId } = this;
        const cached = Cache.getCameraSnapshot(cameraId, id);

        if (!cached) {
            const snapshot = Files.getCameraSnapshot(cameraId, id);
            if (snapshot) {
                Cache.add(snapshot);
            }
            return snapshot;
        }

        return cached;
    }

    public get url (): string {
        return `http://jezioro.firlej.pl/images/Kamery/Kamera${this.id}.jpg?d=${Date.now()}`;
    }
}