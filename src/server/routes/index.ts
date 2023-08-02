import { Router } from "express";

import CameraRoute from "./camera/camera.route";

class Routes {
    public static path = '/api';
    private static instance: Routes;
    private router = Router();

    constructor() {
        this.router.use(CameraRoute.path, CameraRoute.router);
    }

    static get router() {
        if (!Routes.instance) {
            Routes.instance = new Routes();
        }

        return Routes.instance.router;
    }
}

export default Routes;