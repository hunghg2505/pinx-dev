import React, { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { profileUserContext } from '@components/MyProfile';
import { useUpdateUserProfile } from '@components/Profile/service';

import { useUploadImage } from './uploadImage';

const UpLoadCover = () => {
  const profileUser = useContext<any>(profileUserContext);
  const { run, loading } = useUpdateUserProfile(profileUser?.reload);
  const { run: uploadImage, loading: loadingUpload } = useUploadImage(run);
  const { t } = useTranslation('editProfile');
  return (
    <label className='absolute bottom-[14px] right-[14px] cursor-pointer'>
      <input
        disabled={loading || loadingUpload}
        type='file'
        className='hidden'
        onChange={(e: any) => {
          const formData = new FormData();
          formData.append('files', e?.target?.files?.[0]);
          uploadImage(formData);
        }}
      />
      <button
        type='button'
        className='h-[36px] rounded-[5px] bg-[#F0F7FC] px-[16px] py-[5px] text-[14px] font-[700] text-primary_blue'
      >
        {t('upload_image')}
      </button>
    </label>
  );
};
export default UpLoadCover;
