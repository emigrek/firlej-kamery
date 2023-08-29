import { views } from "@client/views/views"
import { useMemo } from "react";
import { useRootPath } from "./useRootPath";

export const useRoutes = () => {
    const rootPath = useRootPath();

    return useMemo(() => {
        return views.map((view) => {
            const active = rootPath === view.link;

            return {
                active,
                view: view
            }
        });
    }, [views, rootPath]);
}