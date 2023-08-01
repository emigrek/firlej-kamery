import { Camera } from "@/models/Camera";
import { Files } from "@/services";
import { validCameraIds } from "@/utils";
import { NextFunction, Request, Response, Router } from "express";

class CameraRoute {
    public static path = "/camera"
    private static instance: CameraRoute;
    private router = Router();

    constructor() {
        this.router.get("/:cameraId", this.get);
        this.router.get("/:cameraId/snapshot/:timestamp", this.getBySnapshot);
    }

    static get router() {
        if (!CameraRoute.instance) {
            CameraRoute.instance = new CameraRoute();
        }

        return CameraRoute.instance.router;
    }

    private get = async (req: Request, res: Response, next: NextFunction) => {
        const cameraId = Number(req.params.cameraId);
        if (!validCameraIds.includes(cameraId)) {
            return res
                .status(400)
                .send({ message: `Invalid camera id, valid ids: ${validCameraIds.join(", ")}` });
        }

        const camera = new Camera(cameraId);
        const snapshots = await camera.getSnapshots();

        return res
            .status(200)
            .send(
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
                .send({ message: `Invalid camera id, valid ids: ${validCameraIds.join(", ")}` });
        }

        const timestamp = Number(req.params.timestamp);
        if (isNaN(timestamp)) {
            return res
                .status(400)
                .send({ message: "Invalid timestamp" });
        }

        const camera = new Camera(cameraId);
        const snapshot = await camera.getSnapshot(timestamp);

        return res
            .status(200)
            .sendFile(
                `${Files.IMAGES_PATH}/${snapshot.path}`
            );
    }
}

export default CameraRoute;