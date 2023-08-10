import { views } from "@client/views/views"
import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useRoutes = () => {
    const { pathname } = useLocation();

    return useMemo(() => {
        return views.map((view) => {
            const active = (pathname.split('/camera').at(0) || '/') === view.link;

            return {
                active,
                view: view
            }
        });
    }, [views, pathname]);
}