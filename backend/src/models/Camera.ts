import axios from "axios";

import { CameraImage } from "@/models/CameraImage";
import { validIds } from "@/utils";

export class Camera {
    public id: number;

    constructor(id: number) {
        if (!validIds.includes(id)) {
            throw new Error('Invalid camera id');
        }

        this.id = id;
    }

    public snapshot = async (): Promise<CameraImage> => {
        const { id } = this;

        if (!validIds.includes(id)) {
            throw new Error('Invalid camera id');
        }

        const response = await axios.get(this.getUrl(), { responseType: 'arraybuffer' });
        if (response.status !== 200) {
            throw new Error('Error while downloading image');
        }
        
        const buffer = Buffer.from(response.data, 'binary');
        const timestamp = Date.now();
        return {
            id,
            timestamp,
            buffer
        }
    }

    public getUrl = (): string => {
        return `http://jezioro.firlej.pl/images/Kamery/Kamera${this.id}.jpg?d=${Date.now()}`;
    }
}