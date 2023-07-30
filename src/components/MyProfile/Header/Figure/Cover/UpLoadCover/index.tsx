import React, { useContext } from 'react';

import { profileUserContext } from '@components/MyProfile';
import { useUpdateUserProfile } from '@components/Profile/service';

import IconCoverEdit from './IconCoverEdit';
import { useUploadImage } from './uploadImage';

const UpLoadCover = () => {
  const profileUser = useContext<any>(profileUserContext);
  const { run } = useUpdateUserProfile(profileUser?.reload);
  const { run: uploadImage, loading: loadingUpload } = useUploadImage(run);
  return (
    <label className='cursor-pointer tablet:hidden'>
      <input
        disabled={loadingUpload}
        type='file'
        accept='image/png, image/jpeg'
        className='hidden'
        onChange={(e: any) => {
          const file = e?.target?.files?.[0];
          const formData = new FormData();
          formData.append('files', file);
          file && uploadImage(formData);
        }}
      />
      <IconCoverEdit loading={loadingUpload} />
    </label>
  );
};
export default UpLoadCover;
