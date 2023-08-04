import { Camera } from "@server/models/Camera";
import { Files } from "@server/services";
import { validCameraIds } from "@shared/cameras";
import { NextFunction, Request, Response, Router } from "express";

class CameraRoute {
    public static path = "/camera"
    private static instance: CameraRoute;
    private router = Router();

    constructor() {
        this.router.use(this.cacheControlMiddleware);
        this.router.get("/:cameraId", this.get);
        this.router.get("/:cameraId/snapshot/:timestamp", this.getBySnapshot);
    }

    static get router() {
        if (!CameraRoute.instance) {
            CameraRoute.instance = new CameraRoute();
        }

        return CameraRoute.instance.router;
    }

    private cacheControlMiddleware = (req: Request, res: Response, next: NextFunction) => {
        res.set('Cache-Control', 'public, max-age=360');
        next();
    }

    private get = async (req: Request, res: Response, next: NextFunction) => {
        const cameraId = Number(req.params.cameraId);
        if (!validCameraIds.includes(cameraId)) {
            return res
                .status(400)
                .json({ message: `Invalid camera id, valid ids: ${validCameraIds.join(", ")}` });
        }

        const camera = new Camera(cameraId);
        const snapshots = await camera.getSnapshots();

        return res
            .status(200)
            .json(
                snapshots.map((snapshot) => ({
                    cameraId: snapshot.cameraId,
                    timestamp: snapshot.timestamp,
                    url: snapshot.url
                }))
            );
    }

    private getBySnapshot = async (req: Request, res: Response, next: NextFunction) => {
        const cameraId = Number(req.params.cameraId);
        if (!validCameraIds.includes(cameraId)) {
            return res
                .status(400)
                .json({ message: `Invalid camera id, valid ids: ${validCameraIds.join(", ")}` });
        }

        const camera = new Camera(cameraId);

        const timestamp = req.params.timestamp;
        if (timestamp === 'latest') {
            const snapshot = await camera.snapshot();

            return res
                .status(200)
                .contentType('image/jpeg')
                .send(snapshot.buffer);
        }

        const snapshot = await camera.getSnapshot(Number(timestamp));
        if (!snapshot) {
            return res
                .status(404)
                .json({ message: "Snapshot not found" });
        }

        return res
            .status(200)
            .sendFile(
                `${Files.IMAGES_PATH}/${snapshot.path}`
            );
    }
}

export default CameraRoute;