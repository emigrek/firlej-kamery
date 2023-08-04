import { Snapshot } from "@server/models/Snapshot";
import { Files } from "@server/services";

export class Cache {
    private static cache: Snapshot[] = [];

    public static init = (): Cache => {
        const images = Files.getAll();
        this.cache = images;
        return this;
    }

    public static add = (image: Snapshot): Cache => {
        this.cache = [...this.cache, image];
        return Cache;
    }

    public static getCameraSnapshots = (cameraId: number): Snapshot[] => {
        return this.cache.filter((image) => image.cameraId === cameraId);
    }

    public static getCameraSnapshot = (cameraId: number, timestamp: number): Snapshot | undefined => {
        return this.cache.find((image) => image.cameraId === cameraId && image.timestamp === timestamp);
    }

    public static getAll = (): Snapshot[] => {
        return this.cache;
    }

    public static set = (images: Snapshot[]): Cache => {
        this.cache = images;
        return this.cache;
    }

    public static expire = (cameraId: number, timestamp: number): Cache => {
        this.cache = this.cache.filter((image) => image.cameraId !== cameraId || image.timestamp !== timestamp);
        return this.cache;
    }

    public static clear = (): Cache => {
        this.cache = [];
        return this.cache;
    }
}