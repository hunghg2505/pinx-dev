import Compressor from 'compressorjs';

import { compressImageParams } from '@utils/common/type';

export const compressorImage = async ({
  file,
  targetQuality = 0.9,
  maxFileSizeKB,
  onSuccess,
  onCompressStart,
  onError,
  compressorOpt,
}: compressImageParams) => {
  try {
    let compressedImage: File | Blob = file;
    const initFileSizeKB = file.size / 1024;
    let quality = targetQuality;
    onCompressStart && onCompressStart();

    if (initFileSizeKB > maxFileSizeKB) {
      while (quality >= 0 && compressedImage.size / 1024 > maxFileSizeKB) {
        compressedImage = await new Promise((resolve, reject) => {
          // eslint-disable-next-line no-new
          new Compressor(file, {
            quality,
            ...compressorOpt,
            success(result) {
              resolve(result);
            },
            error(error) {
              reject(error.message);
            },
          });
        });

        if (compressedImage.size / 1024 > maxFileSizeKB) {
          quality -= 0.1;
        }
      }
    } else {
      compressedImage = await new Promise((resolve, reject) => {
        // eslint-disable-next-line no-new
        new Compressor(file, {
          ...compressorOpt,
          success(result) {
            resolve(result);
          },
          error(error) {
            reject(error.message);
          },
        });
      });
    }

    await onSuccess(compressedImage);
  } catch (error) {
    onError && onError(error);
  }
};
