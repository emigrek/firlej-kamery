export const cacheImages = async (startIndex: number, srcs: string[]) => {
    const promises = srcs.map((src, index) => {
        if (index < startIndex) return;
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
        });
    });
    
    return Promise.all(promises);
};