import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useRootPath = () => {
    const { pathname } = useLocation();

    return useMemo(() => {
        return pathname.split('/camera').at(0) || '/';
    }, [pathname]);
}