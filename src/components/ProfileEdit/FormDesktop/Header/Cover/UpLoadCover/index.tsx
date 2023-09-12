import React, { ChangeEvent, useState } from 'react';

import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/named
import { Field, FormInstance } from 'rc-field-form';
import { toast } from 'react-hot-toast';

import { useUploadImage } from '@components/ProfileEdit/FormDesktop/service';
import Loading from '@components/UI/Loading';
import { CONVERT_IMAGE_ERR_MSG, compressorImage, convertImageToJpg } from '@utils/common';
import { COVER_SIZE, MAX_COVER_FILE_SIZE_KB } from 'src/constant';

import ModalCropImage from '../../ModalCropImage';

const UpLoadCover = ({ form }: { form: FormInstance }) => {
  const { t } = useTranslation('editProfile');
  const [openModalCropImg, setOpenModalCropImg] = useState(false);
  const [loading2, setLoading2] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File>();

  const { run, loading } = useUploadImage();

  const setField = (value: string) => {
    form.setFieldsValue({
      coverImage: value,
    });
  };

  const handleCompressSuccess = async (blob: File | Blob) => {
    const blobToFile = new File([blob], '.jpg', {
      type: blob.type,
    });
    setLoading2(false);
    const formData = new FormData();
    formData.append('files', blobToFile);

    blob && run(formData, '', setField);
  };

  const handleConvertToJpgSuccess = async (file: Blob | null) => {
    setLoading2(false);

    if (file) {
      compressorImage({
        file,
        maxFileSizeKB: MAX_COVER_FILE_SIZE_KB,
        onSuccess: handleCompressSuccess,
        onCompressStart: () => setLoading2(true),
        onError: (message) => {
          setLoading2(false);
          toast.error(message);
        },
      });
    }
  };

  const handleCropImageSuccess = (blob: Blob | null) => {
    setOpenModalCropImg(false);

    if (blob) {
      setLoading2(true);

      // convert image to jpg
      convertImageToJpg(blob, handleConvertToJpgSuccess, (error) => {
        setLoading2(false);
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
                      // setOpenModalCropImg(true);
                      // setFile(file);

                      const formData = new FormData();
                      formData.append('files', file);

                      file && run(formData, '', setField);
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

      <ModalCropImage
        width={COVER_SIZE.width}
        height={COVER_SIZE.height}
        file={file}
        visible={openModalCropImg}
        onClose={() => setOpenModalCropImg(false)}
        cropperOptions={{
          aspectRatio: 16 / 9,
          autoCropArea: 1,
          zoomOnTouch: false,
          zoomOnWheel: false,
          cropBoxResizable: false,
          dragMode: 'move',
        }}
        onCropSuccess={handleCropImageSuccess}
      />
    </>
  );
};
export default UpLoadCover;
