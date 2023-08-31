import { FC, useRef, useEffect } from 'react'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { usePlayerContext } from './context';

interface AmbientLightsProps extends HTMLMotionProps<'div'> { }

const AmbientLights: FC<AmbientLightsProps> = ({ ...props }) => {
    const { imageNode, ambientLights } = usePlayerContext();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    const draw = () => {
        if (!imageNode)
            return;

        canvasCtxRef.current?.drawImage(imageNode, 0, 0, 16, 9);
    }

    const init = () => {
        const canvas = canvasRef.current;

        if (!canvas || !imageNode) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvasCtxRef.current = ctx;

        imageNode.addEventListener("load", draw);
    }

    useEffect(() => {
        init();
        draw();

        return () => imageNode?.removeEventListener("load", draw);
    }, [ambientLights, imageNode, canvasRef]);

    return (
        <motion.div
            className='fixed top-0 left-0 w-full h-full -z-10 blur-xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 5
            }}
            {...props}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                aria-hidden="true"
                width={16}
                height={9}
            />
        </motion.div>
    )
}

const Wrapper = () => {
    const { ambientLights } = usePlayerContext();

    return (
        <AnimatePresence>
            {ambientLights && <AmbientLights />}
        </AnimatePresence>
    )
};

export default Wrapper;