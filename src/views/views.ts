import { IconType } from "react-icons/lib";
import { PiGridFourFill, PiInfo, PiMapTrifoldFill } from "react-icons/pi";

export enum Views {
    Map = "map",
    Grid = "grid",
    About = "about",
}

export type View = `${Views}`;

export interface ViewItem {
    label: string;
    view: View;
    icon: IconType;
    newFeature?: boolean;
}

export const views: ViewItem[] = [
    
    {
        label: "Siatka",
        view: Views.Grid,
        icon: PiGridFourFill as IconType
    },
    {
        label: "Mapa",
        view: Views.Map,
        icon: PiMapTrifoldFill as IconType,
        newFeature: true
    },
    {
        label: "O aplikacji",
        view: Views.About,
        icon: PiInfo as IconType
    }
];