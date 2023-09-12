import React, { ChangeEvent, useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { profileUserContext } from '@components/MyProfile';
import { useUpdateUserProfile } from '@components/Profile/service';
import ModalCropImage from '@components/ProfileEdit/FormDesktop/Header/ModalCropImage';
import { CONVERT_IMAGE_ERR_MSG, compressorImage, convertImageToJpg } from '@utils/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { COVER_SIZE, MAX_COVER_FILE_SIZE_KB } from 'src/constant';

import IconCoverEdit from './IconCoverEdit';
import { useUploadImage } from './uploadImage';

const UpLoadCover = () => {
  const { t } = useTranslation();
  const profileUser = useContext<any>(profileUserContext);
  const { run } = useUpdateUserProfile(profileUser?.reload);
  const { run: uploadImage, loading: loadingUpload } = useUploadImage(run);
  const [loading, setLoading] = useState(false);
  const [openModalCropImg, setOpenModalCropImg] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File>();

  const handleCompressSuccess = async (blob: File | Blob) => {
    setLoading(false);
    const blobToFile = new File([blob], '.jpg', {
      type: blob.type,
    });

    const formData = new FormData();
    formData.append('files', blobToFile);
    blob && uploadImage(formData);
  };

  const convertToJpgSuccess = async (file: Blob | null) => {
    setLoading(false);
    if (file) {
      await compressorImage({
        file,
        maxFileSizeKB: MAX_COVER_FILE_SIZE_KB,
        onSuccess: handleCompressSuccess,
        onCompressStart: () => setLoading(true),
        onError: (message) => {
          setLoading(false);
          toast.error(message);
        },
      });
    }
  };

  const handleCropImageSuccess = (blob: Blob | null) => {
    setOpenModalCropImg(false);

    if (blob) {
      setLoading(true);

      // convert image to jpg
      convertImageToJpg(blob, convertToJpgSuccess, (error) => {
        setLoading(false);

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

  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];

    if (file) {
      // setOpenModalCropImg(true);
      // setFile(file);
      handleCropImageSuccess(file);
    }
  };

  return (
    <>
      <label className='cursor-pointer tablet:hidden'>
        <input
          disabled={loadingUpload}
          type='file'
          accept='image/png, image/jpeg, .webp'
          className='hidden'
          onClick={(e: any) => (e.target.value = '')}
          onChange={handleChangeCover}
        />
        <IconCoverEdit loading={loadingUpload || loading} />
      </label>

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
