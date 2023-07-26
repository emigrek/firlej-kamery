import { validIds } from "@/utils";
import { NextFunction, Request, Response, Router } from "express";

class CameraRoute {
    public static path = "/camera"
    private static instance: CameraRoute;
    private router = Router();

    constructor() {
        this.router.get("/:id", this.get);
    }

    static get router() {
        if (!CameraRoute.instance) {
            CameraRoute.instance = new CameraRoute();
        }

        return CameraRoute.instance.router;
    }

    private get = async (req: Request, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);
        if (!validIds.includes(id)) {
            return res
                .status(400)
                .send({ message: `Invalid camera id, valid ids: ${validIds.join(", ")}` });
        }

        // TODO
        // on init read all images from disk and cache them
        // on request check if cache contains images for given id
        // if not, read images from disk and cache them
        // else return images from cache
        
        res.json({
            id
        });
    }
}

export default CameraRoute;