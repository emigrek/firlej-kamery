export const cacheImages = async (srcs: string[], start?: number) => {
    const promises = srcs.map((src, index) => {
        if (index < (start || 0)) return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = () => reject(`Failed to load image: ${src}`);
        });   
    });
    
    return await Promise.all(promises);
};