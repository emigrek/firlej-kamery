import { IconType } from "react-icons/lib";
import { PiGridFourFill, PiMapTrifoldFill } from "react-icons/pi";

export enum Views {
    Map = "map",
    Grid = "grid"
}

export type View = `${Views}`;

export interface ViewItem {
    label: string;
    view: View;
    icon: IconType;
}

export const views: ViewItem[] = [
    {
        label: "Mapa",
        view: Views.Map,
        icon: PiMapTrifoldFill as IconType
    },
    {
        label: "Siatka",
        view: Views.Grid,
        icon: PiGridFourFill as IconType
    }
];