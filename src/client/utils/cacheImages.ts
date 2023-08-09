export const cacheImages = async (srcs: string[]) => {
    const promises = srcs.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
        });
    });
    
    return Promise.all(promises);
};