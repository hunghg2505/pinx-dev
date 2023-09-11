import React, { ChangeEvent, useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { profileUserContext } from '@components/MyProfile';
import { useUpdateUserProfile } from '@components/Profile/service';
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
        onError: (message) => toast.error(message),
        // compressorOpt: {
        //   width: COVER_SIZE.width,
        //   height: COVER_SIZE.height,
        //   resize: 'cover',
        // },
      });
    }
  };

  const handleChangeCover = (e: ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)[0];
    setLoading(true);

    // convert image to jpg
    convertImageToJpg(file, convertToJpgSuccess, (error) => {
      switch (error) {
        case CONVERT_IMAGE_ERR_MSG.FILE_INVALID: {
          return toast.error(t('file_invalid'));
        }
        default: {
          return toast.error(t('error'));
        }
      }
    });
  };

  return (
    <label className='cursor-pointer tablet:hidden'>
      <input
        disabled={loadingUpload}
        type='file'
        accept='image/png, image/jpeg, .webp'
        className='hidden'
        onChange={handleChangeCover}
      />
      <IconCoverEdit loading={loadingUpload || loading} />
    </label>
  );
};
export default UpLoadCover;
