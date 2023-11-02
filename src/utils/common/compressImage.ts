import { CompressImageParams } from '@utils/common/type';

export const compressImage = async ({
  file,
  maxFileSizeKb,
  quality,
  options,
  maxWidthOrHeight = 1280,
}: CompressImageParams) => {
  const initOptions: any = { ...options };
  const fileSizeKB = file.size / 1024;

  if (maxFileSizeKb) {
    initOptions.maxSizeMB = maxFileSizeKb / 1024;
  }

  if (quality) {
    initOptions.initialQuality = quality;
  }

  try {
    if ((maxFileSizeKb && fileSizeKB > maxFileSizeKb) || quality) {
      const imageCompression = (await import('browser-image-compression')).default;
      const compressedImage = await imageCompression(file, {
        ...initOptions,
        maxWidthOrHeight,
        alwaysKeepResolution: true,
      });

      return compressedImage;
    }

    return file;
  } catch {}
};
