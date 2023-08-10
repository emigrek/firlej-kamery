import { IconType } from "react-icons/lib";
import { PiGridFourFill, PiInfoFill, PiMapTrifoldFill } from "react-icons/pi";
import { FC } from "react";

import MapView from "./Map";
import GridView from "./Grid";
import AboutView from "./About";

export enum Views {
    Map = "map",
    Grid = "grid",
    About = "about"
}

export type View = `${Views}`;

export interface ViewItem {
    path: string;
    link: string;
    label: string;
    view: View;
    icon: IconType;
    component: FC;
}

export const views: ViewItem[] = [
    {
        path: `/camera?/:cameraName?`,
        link: `/`,
        label: "Siatka",
        view: Views.Grid,
        component: GridView,
        icon: PiGridFourFill as IconType
    },
    {
        path: `/map/camera?/:cameraName?`,
        link: `/map`,
        label: "Mapa",
        view: Views.Map,
        component: MapView,
        icon: PiMapTrifoldFill as IconType
    },
    {
        path: `/about`,
        link: `/about`,
        label: "O aplikacji",
        view: Views.About,
        component: AboutView,
        icon: PiInfoFill as IconType
    }
];