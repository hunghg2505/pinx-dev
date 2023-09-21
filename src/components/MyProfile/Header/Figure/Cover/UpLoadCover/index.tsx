import React, { ChangeEvent, useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { profileUserContext } from '@components/MyProfile';
import { useUpdateUserProfile } from '@components/Profile/service';
import ModalCropAvatarCover from '@components/ProfileEdit/FormDesktop/Header/ModalCropAvatarCover';
import { compressImage } from '@utils/common';
import { MAX_COVER_FILE_SIZE_KB } from 'src/constant';

import IconCoverEdit from './IconCoverEdit';
import { useUploadImage } from './uploadImage';

const UpLoadCover = () => {
  const { t } = useTranslation();
  const profileUser = useContext<any>(profileUserContext);
  const { run } = useUpdateUserProfile(profileUser?.reload);
  const { run: uploadImage, loading: loadingUpload } = useUploadImage(run);
  const [loading, setLoading] = useState(false);
  const [openModalCropImg, setOpenModalCropImg] = useState(false);
  const [file, setFile] = useState<File>();

  const handleCompressSuccess = async (blob: File | Blob) => {
    setLoading(false);
    const blobToFile = new File([blob], '.' + blob.type.split('/')[1], {
      type: blob.type,
    });

    const formData = new FormData();
    formData.append('files', blobToFile);
    blob && uploadImage(formData);
  };

  const handleCropImageSuccess = async (blob: any) => {
    setOpenModalCropImg(false);

    if (blob) {
      try {
        setLoading(true);

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
        setLoading(false);
        toast.error(t('error'));
      }
    }
  };

  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];

    if (file) {
      setOpenModalCropImg(true);
      setFile(file);
    }
  };

  return (
    <>
      <label className='cursor-pointer tablet:hidden'>
        <input
          disabled={loadingUpload}
          type='file'
          // accept='image/png, image/jpeg, .webp'
          accept='image/png, image/jpeg'
          className='hidden'
          onClick={(e: any) => (e.target.value = '')}
          onChange={handleChangeCover}
        />
        <IconCoverEdit loading={loadingUpload || loading} />
      </label>

      <ModalCropAvatarCover
        file={file}
        visible={openModalCropImg}
        onClose={() => setOpenModalCropImg(false)}
        showZoomControl={false}
        cropCover
        onSuccess={handleCropImageSuccess}
      />
    </>
  );
};
export default UpLoadCover;
