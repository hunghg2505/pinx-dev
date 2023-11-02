import { CONVERT_IMAGE_ERR_MSG } from '@utils/common/type';

export const convertImageToJpg = async (
  file: File | Blob,
  onSuccess: (file: Blob | null) => Promise<void>,
  onError?: (message: string) => void,
): Promise<void> => {
  if (!['image/png', 'image/jpg', 'image/jpeg', 'image/webp'].includes(file.type)) {
    onError && onError(CONVERT_IMAGE_ERR_MSG.FILE_INVALID);
  }

  const imageConverted: Blob | null = await new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('load', async (e) => {
      const img = new Image();
      img.src = e.target?.result?.toString() || '';

      img.addEventListener('load', async () => {
        const canvas = document.createElement('canvas');
        const ctx: any = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx?.drawImage(img, 0, 0);

        // fill background color to png file
        if (file.type === 'image/png') {
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'white';
          ctx?.fillRect(0, 0, canvas.width, canvas.height);
        }

        canvas.toBlob(async (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            onError && onError(CONVERT_IMAGE_ERR_MSG.ERROR);
          }
        }, 'image/jpeg');
      });
    });

    reader.readAsDataURL(file);
  });

  await onSuccess(imageConverted);
};
