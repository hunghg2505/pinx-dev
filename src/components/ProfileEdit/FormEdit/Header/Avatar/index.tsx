import React, { ChangeEvent, useState } from 'react';

import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/named
import { Field, FormInstance } from 'rc-field-form';
import { toast } from 'react-hot-toast';

import ModalCropAvatarCover from '@components/ProfileEdit/FormDesktop/Header/ModalCropAvatarCover';
import { useUploadImage } from '@components/ProfileEdit/FormDesktop/service';
import Loading from '@components/UI/Loading';
import { compressImage } from '@utils/common';
import { MAX_AVATAR_FILE_SIZE_KB } from 'src/constant';

import Img from './Img';

const Avatar = ({ form }: { form: FormInstance }) => {
  const { t } = useTranslation();
  const { run, loading } = useUploadImage();
  const [loading2, setLoading2] = useState(false);
  const [openModalCropImg, setOpenModalCropImg] = useState(false);
  const [file, setFile] = useState<File>();

  const setField = (value: string) => {
    form.setFieldsValue({
      avatar: value,
    });
  };

  const handleCompressSuccess = async (blob: File | Blob) => {
    setLoading2(false);
    const blobToFile = new File([blob], '.' + blob.type.split('/')[1], {
      type: blob.type,
    });

    const formData = new FormData();
    formData.append('files', blobToFile);
    blob && run(formData, 'avatar', setField);
  };

  const handleCropImageSuccess = async (blob: any) => {
    setOpenModalCropImg(false);

    if (blob) {
      setLoading2(true);

      try {
        // compress image
        const compressedImage = await compressImage({
          file: blob,
          maxFileSizeKb: MAX_AVATAR_FILE_SIZE_KB,
          options: {
            fileType: 'image/jpeg',
          },
        });

        setLoading2(false);

        if (compressedImage) {
          await handleCompressSuccess(compressedImage);
        }
      } catch {
        setLoading2(false);
        toast.error(t('error'));
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];

    if (file) {
      setOpenModalCropImg(true);
      setFile(file);
    }
  };

  return (
    <>
      <div className='relative mb-[21px]'>
        <Img />
        <label className=' absolute  bottom-0 right-[9px] flex h-[44px]  w-[44px] items-center justify-center rounded-full border-[2px] border-solid border-white bg-primary_blue'>
          <Field>
            {() => {
              return (
                <input
                  type='file'
                  // accept='image/png, image/jpeg, .webp'
                  accept='image/png, image/jpeg'
                  className='hidden'
                  disabled={loading || loading2}
                  onChange={handleChange}
                  onClick={(e: any) => (e.target.value = '')}
                />
              );
            }}
          </Field>
          {loading || loading2 ? (
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
        </label>
      </div>

      <ModalCropAvatarCover
        file={file}
        visible={openModalCropImg}
        onClose={() => setOpenModalCropImg(false)}
        showZoomControl
        onSuccess={handleCropImageSuccess}
      />
    </>
  );
};
export default Avatar;
