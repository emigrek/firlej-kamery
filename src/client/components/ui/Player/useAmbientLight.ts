import { useEffect, useRef } from "react";

export const useAmbientLight = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    const draw = () => {
        canvasCtxRef.current?.drawImage(imageRef.current!, 0, 0, 16, 9);
    }

    const init = () => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvasCtxRef.current = ctx;

        imageRef.current?.addEventListener("load", draw);
    }

    useEffect(() => {
        init();
        draw();

        return () => {
            imageRef.current?.removeEventListener("load", draw);
        }
    }, [canvasRef.current, imageRef.current]);

    return {
        imageRef,
        canvasRef
    }
}