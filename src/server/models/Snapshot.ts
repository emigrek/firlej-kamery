export class Snapshot {
    public id: string;
    public cameraId: number;
    public timestamp: number;
    public filename: string;
    public buffer: Buffer;

    constructor(options: { id: string, cameraId: number, timestamp: number, buffer: Buffer }) {
        this.id = options.id;
        this.cameraId = options.cameraId;
        this.timestamp = options.timestamp;
        this.buffer = options.buffer;
        this.filename = `${this.id}`;
    }

    public setId = (id: string): Snapshot => {
        this.id = id;
        return this;
    }

    public get url (): string {
        return `/api/camera/${this.cameraId}/snapshot/${this.id}`;
    }

    public get path (): string {
        return `/${this.cameraId}/${this.filename}.jpg`;
    }
}