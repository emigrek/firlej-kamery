import { Snapshot } from "@/models/Snapshot";
import { Files } from "@/services";

export class Cache {
    private static cache: Map<number, Snapshot[]> = new Map<number, Snapshot[]>();

    public static init = (): void => {
        const images = Files.getAll();

        for (const image of images) {
            Cache.add(image.cameraId, image);
        }
    }

    public static add = (cameraId: number, image: Snapshot): void => {
        const images = Cache.get(cameraId);
        Cache.set(cameraId, [...images, image]);
    }

    public static get = (cameraId: number): Snapshot[] => {
        return Cache.cache.get(cameraId) || [];
    }

    public static set = (cameraId: number, images: Snapshot[]): void => {
        Cache.cache.set(cameraId, images);
    }

    public static clear = (): void => {
        Cache.cache.clear();
    }
}