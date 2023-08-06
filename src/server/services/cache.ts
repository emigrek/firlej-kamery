import { Snapshot } from "@server/models/Snapshot";
import { Files } from "@server/services";

export class Cache {
    private static cache: Snapshot[] = [];

    public static init = (): Cache => {
        const snapshots = Files.getAll();
        this.cache = snapshots;
        return this;
    }

    public static add = (image: Snapshot): Cache => {
        this.cache = [...this.cache, image];
        return Cache;
    }

    public static getCameraSnapshots = (cameraId: number): Snapshot[] => {
        return this.cache.filter((image) => image.cameraId === cameraId);
    }

    public static getCameraSnapshot = (cameraId: number, id: string): Snapshot | undefined => {
        return this.cache.find((image) => image.cameraId === cameraId && image.id === id);
    }

    public static getAll = (): Snapshot[] => {
        return this.cache;
    }

    public static set = (images: Snapshot[]): Cache => {
        this.cache = images;
        return this.cache;
    }

    public static expire = (cameraId: number, id: string): Cache => {
        this.cache = this.cache.filter((image) => image.cameraId !== cameraId || image.id !== id);
        return this.cache;
    }

    public static clear = (): Cache => {
        this.cache = [];
        return this.cache;
    }
}