import axios from "axios";

import { Snapshot } from "@/models/Snapshot";
import { validCameraIds } from "@/utils";
import { Cache, Files } from "@/services";

export class Camera {
    public id: number;

    constructor(id: number) {
        if (!validCameraIds.includes(id)) {
            throw new Error('Invalid camera id');
        }

        this.id = id;
    }

    public snapshot = async (): Promise<Snapshot> => {
        const { id } = this;

        const { status, data } = await axios.get(this.url, { responseType: 'arraybuffer' });
        if (status !== 200) {
            throw new Error('Error while downloading image');
        }

        const buffer = Buffer.from(data, 'binary');
        const timestamp = Date.now();

        return new Snapshot(id, timestamp, buffer);
    }

    public getSnapshots = async (): Promise<Snapshot[]> => {
        const { id } = this;

        const cached = Cache.get(id);
        
        if (!cached.length) {
            throw new Error('No snapshots found');
        }

        return cached;
    }

    public getSnapshot = async (timestamp: number): Promise<Snapshot> => {
        const { id } = this;

        const cached = Cache.get(id);
        const snapshot = cached.find((snapshot) => snapshot.timestamp === timestamp);
        
        if (!snapshot) {
            throw new Error('Snapshot not found');
        }

        return snapshot;
    }


    public get url (): string {
        return `http://jezioro.firlej.pl/images/Kamery/Kamera${this.id}.jpg?d=${Date.now()}`;
    }
}