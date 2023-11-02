import React, { ChangeEvent, useState } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/named
import { Field, FormInstance } from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { useUploadImage } from '@components/ProfileEdit/FormDesktop/service';
import Loading from '@components/UI/Loading';
import { compressImage } from '@utils/common';
import { MAX_COVER_FILE_SIZE_KB } from 'src/constant';

// import ModalCropAvatarCover from '../../ModalCropAvatarCover';

const ModalCropAvatarCover = dynamic(() => import('../../ModalCropAvatarCover'));

const UpLoadCover = ({ form }: { form: FormInstance }) => {
  const { t } = useTranslation('editProfile');
  const [openModalCropImg, setOpenModalCropImg] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [file, setFile] = useState<File>();

  const { run, loading } = useUploadImage();

  const setField = (value: string) => {
    form.setFieldsValue({
      coverImage: value,
    });
  };

  const handleCompressSuccess = async (blob: File) => {
    const blobToFile = new File([blob], '.' + blob.type.split('/')[1], {
      type: blob.type,
    });
    setLoading2(false);
    const formData = new FormData();
    formData.append('files', blobToFile);

    blob && run(formData, '', setField);
  };

  const handleCropImageSuccess = async (blob: any) => {
    setOpenModalCropImg(false);

    if (blob) {
      try {
        setLoading2(true);

        // compress image
        const compressedImage = await compressImage({
          file: blob,
          maxFileSizeKb: MAX_COVER_FILE_SIZE_KB,
          options: {
            fileType: 'image/jpeg',
          },
        });

        if (compressedImage) {
          await handleCompressSuccess(compressedImage);
        }
      } catch {
        setLoading2(false);
        toast.error(t('error'));
      }
    }
  };

  return (
    <>
      <Field>
        {() => {
          return (
            <>
              <label className='absolute bottom-[14px] right-[14px] cursor-pointer'>
                <input
                  type='file'
                  // accept='image/png, image/jpeg, .webp'
                  accept='image/png, image/jpeg'
                  className='hidden'
                  onClick={(e: any) => (e.target.value = '')}
                  disabled={loading || loading2}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = (e.target.files as FileList)[0];

                    if (file) {
                      setOpenModalCropImg(true);
                      setFile(file);
                    }
                  }}
                />
                <span className=' flex h-[36px] items-center rounded-[5px] bg-[#F0F7FC] px-[16px] py-[5px] text-[14px] font-[700] text-primary_blue'>
                  {loading || loading2 ? <Loading /> : t('upload_image')}
                </span>
              </label>
            </>
          );
        }}
      </Field>

      <ModalCropAvatarCover
        cropCover
        showZoomControl={false}
        file={file}
        onSuccess={handleCropImageSuccess}
        visible={openModalCropImg}
        onClose={() => setOpenModalCropImg(false)}
      />
    </>
  );
};
export default UpLoadCover;
