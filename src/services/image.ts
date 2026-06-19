// On-device image compression for bookmark uploads.
//
// Bookmarks are reference shots (subway maps, screenshots), not an archive, so
// we downscale to a sane max dimension and re-encode as JPEG before upload.
// This keeps the Apps Script POST small and uploads fast on mobile data.

export interface CompressedImage {
  base64: string; // raw base64 (no data: prefix)
  mimeType: string;
  filename: string;
}

const MAX_DIM = 1600;
const QUALITY = 0.82;

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  // createImageBitmap with imageOrientation honours EXIF rotation (phone photos).
  if ('createImageBitmap' in window) {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      // Fall through to <img> path (e.g. older Safari / unsupported option).
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = url;
    });
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function compressImage(
  file: File,
  maxDim = MAX_DIM,
  quality = QUALITY,
  rotation = 0
): Promise<CompressedImage> {
  const bitmap = await loadBitmap(file);
  const srcW = (bitmap as ImageBitmap).width || (bitmap as HTMLImageElement).naturalWidth;
  const srcH = (bitmap as ImageBitmap).height || (bitmap as HTMLImageElement).naturalHeight;

  const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
  const w = Math.max(1, Math.round(srcW * scale));
  const h = Math.max(1, Math.round(srcH * scale));

  // Bake the rotation into the output so the stored file is correctly oriented.
  const rot = (((rotation % 360) + 360) % 360) as 0 | 90 | 180 | 270;
  const swap = rot === 90 || rot === 270;

  const canvas = document.createElement('canvas');
  canvas.width = swap ? h : w;
  canvas.height = swap ? w : h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rot) ctx.rotate((rot * Math.PI) / 180);
  ctx.drawImage(bitmap as CanvasImageSource, -w / 2, -h / 2, w, h);
  if ('close' in bitmap && typeof bitmap.close === 'function') bitmap.close();

  const dataUrl = canvas.toDataURL('image/jpeg', quality);
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);

  const stem = (file.name || 'bookmark').replace(/\.[^.]+$/, '').replace(/[^\w-]+/g, '_').slice(0, 40) || 'bookmark';
  return { base64, mimeType: 'image/jpeg', filename: `${stem}.jpg` };
}
