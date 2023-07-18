import React, { useContext } from 'react';

import { profileUserContext } from '@components/Profile';
import { useUpdateUserProfile } from '@components/Profile/service';

import IconCoverEdit from './IconCoverEdit';
import { useUploadImage } from './uploadImage';

const UpLoadCover = () => {
  const profileUser = useContext<any>(profileUserContext);
  const { run, loading } = useUpdateUserProfile(profileUser?.reload);
  const { run: uploadImage, loading: loadingUpload } = useUploadImage(run);
  return (
    <label className='cursor-pointer'>
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
      <IconCoverEdit />
    </label>
  );
};
export default UpLoadCover;
