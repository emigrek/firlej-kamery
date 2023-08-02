export class Snapshot {
    public cameraId: number;
    public timestamp: number;
    public buffer: Buffer;

    constructor(cameraId: number, timestamp: number, buffer: Buffer) {
        this.cameraId = cameraId;
        this.timestamp = timestamp;
        this.buffer = buffer;
    }

    public get url (): string {
        return `/api/camera/${this.cameraId}/snapshot/${this.timestamp}`;
    }

    public get path (): string {
        return `/${this.cameraId}/${this.timestamp}.jpg`;
    }
}