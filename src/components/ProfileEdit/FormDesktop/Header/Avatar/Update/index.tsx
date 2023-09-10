import React, { ChangeEvent, useState } from 'react';

import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/named
import { Field, FormInstance } from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { useUploadImage } from '@components/ProfileEdit/FormDesktop/service';
import Loading from '@components/UI/Loading';
import { CONVERT_IMAGE_ERR_MSG, compressorImage, convertImageToJpg } from '@utils/common';
import { AVATAR_SIZE, MAX_AVATAR_FILE_SIZE_KB } from 'src/constant';

import ModalCropImage from '../../ModalCropImage';

const Update = ({ form }: { form: FormInstance }) => {
  const [openModalCropImg, setOpenModalCropImg] = useState(false);
  const [file, setFile] = useState<File>();
  const [onCompressing, setOnCompressing] = useState(false);
  const { t } = useTranslation();
  const { run, loading } = useUploadImage();

  const setField = (value: string) => {
    form.setFieldsValue({
      avatar: value,
    });
  };

  const handleCompressSuccess = (blob: File | Blob) => {
    setOnCompressing(false);
    const blobToFile = new File([blob], '.jpg', {
      type: blob.type,
    });

    const formData = new FormData();
    formData.append('files', blobToFile);

    file && run(formData, '', setField);
  };

  const handleConvertToJpgSuccess = (file: Blob | null) => {
    if (file) {
      compressorImage({
        file,
        maxFileSizeKB: MAX_AVATAR_FILE_SIZE_KB,
        onSuccess: handleCompressSuccess,
        onCompressStart: () => setOnCompressing(true),
        onError: (message) => toast.error(message),
      });
    }
  };

  const handleCropImageSuccess = (blob: Blob | null) => {
    setOpenModalCropImg(false);

    if (blob) {
      // convert image to jpg
      convertImageToJpg(blob, handleConvertToJpgSuccess, (error) => {
        switch (error) {
          case CONVERT_IMAGE_ERR_MSG.FILE_INVALID: {
            return toast.error(t('file_invalid'));
          }
          default: {
            return toast.error(t('error'));
          }
        }
      });
    }
  };

  return (
    <>
      <Field>
        {() => {
          return (
            <>
              <input
                type='file'
                accept='image/png, image/jpeg, .webp'
                className='hidden'
                disabled={loading || onCompressing}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const file = (e.target.files as FileList)[0];

                  if (file) {
                    setOpenModalCropImg(true);
                    setFile(file);
                  }
                }}
              />
              <p className='absolute -bottom-[4px] right-[10px] flex h-[36px]  w-[36px] cursor-pointer items-center justify-center rounded-full border-[2px] border-solid border-white bg-primary_blue'>
                {loading || onCompressing ? (
                  <Loading className='!bg-white' />
                ) : (
                  <svg
                    width='18'
                    height='16'
                    viewBox='0 0 18 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M16.25 2.28571H14.5625L14 1.14284C13.9701 1.08297 13.9416 1.02461 13.9139 0.967983L13.9139 0.967911C13.634 0.395532 13.4406 0 12.875 0H6.12498C5.55909 0 5.33822 0.451875 5.0782 0.983877C5.05262 1.03621 5.02666 1.08931 4.99996 1.14284L4.43746 2.28571H2.75C1.50742 2.28571 0.5 3.30913 0.5 4.57143V13.7143C0.5 14.9766 1.50742 16 2.75 16H16.25C17.4925 16 18.5 14.9766 18.5 13.7143V4.57143C18.4999 3.30916 17.4925 2.28571 16.25 2.28571ZM9.49998 13.7143C7.01487 13.7143 4.99999 11.6675 4.99999 9.14289C4.99999 6.61832 7.01487 4.57146 9.49998 4.57146C11.9851 4.57146 14 6.61832 14 9.14289C14 11.6675 11.9851 13.7143 9.49998 13.7143ZM6.12498 9.14289C6.12498 7.24917 7.63586 5.7143 9.49998 5.7143C11.3641 5.7143 12.875 7.24914 12.875 9.14289C12.875 11.0366 11.3641 12.5715 9.49998 12.5715C7.63586 12.5715 6.12498 11.0366 6.12498 9.14289Z'
                      fill='white'
                    />
                  </svg>
                )}
              </p>
            </>
          );
        }}
      </Field>

      <ModalCropImage
        width={AVATAR_SIZE.width}
        height={AVATAR_SIZE.height}
        file={file}
        visible={openModalCropImg}
        onClose={() => setOpenModalCropImg(false)}
        cropperOptions={{
          aspectRatio: 1 / 1,
        }}
        onCropSuccess={handleCropImageSuccess}
      />
    </>
  );
};
export default Update;
