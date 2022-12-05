export default function downloadUint8Array(data: Uint8Array, filename: string) {
    const imageData = new ImageData(new Uint8ClampedArray(data), 1270, 601);
    const canvas = document.createElement("canvas");
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        throw new Error("Failed to get canvas context");
    }
    // mirror image horizontally
    ctx.putImageData(imageData, 0, 0);
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, 0);

    const url = canvas.toDataURL("image/jpeg");
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    a.remove();
    return url;
}