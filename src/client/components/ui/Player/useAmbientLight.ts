import { useEffect, useRef } from "react";

export const useAmbientLight = () => {
    const imageRef = useRef<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const image = imageRef.current;

        if (!canvas || !image) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvasCtxRef.current = ctx;

        const draw = () => {
            ctx.drawImage(imageRef.current!, 0, 0, 16, 9);
        }

        imageRef.current?.addEventListener("load", draw)

        return () => {
            canvasCtxRef.current = null;

            imageRef.current?.removeEventListener("load", draw);
        }
    }, []);

    return {
        imageRef,
        canvasRef
    }
}