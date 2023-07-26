import { CameraImage } from "@/models/CameraImage";

export class Cache {
    private static cache: Map<number, CameraImage> = new Map<number, CameraImage>();

    public static get = (key: number): CameraImage | undefined => {
        return Cache.cache.get(key);
    }

    public static set = (key: number, value: CameraImage): void => {
        Cache.cache.set(key, value);
    }

    public static clear = (): void => {
        Cache.cache.clear();
    }
}