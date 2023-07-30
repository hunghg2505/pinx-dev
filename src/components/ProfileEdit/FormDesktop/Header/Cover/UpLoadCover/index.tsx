import React from 'react';

import { useTranslation } from 'next-i18next';
import { Field } from 'rc-field-form';

import { useUploadImage } from '@components/ProfileEdit/FormDesktop/service';
import Loading from '@components/UI/Loading';

const UpLoadCover = () => {
  const { t } = useTranslation('editProfile');
  const { run, loading } = useUploadImage();
  return (
    <Field name='coverImage'>
      {({ onChange }) => {
        return (
          <>
            <label className='absolute bottom-[14px] right-[14px] cursor-pointer'>
              <input
                type='file'
                accept='image/png, image/jpeg'
                className='hidden'
                disabled={loading}
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  const formData = new FormData();
                  formData.append('files', file);
                  file && run(formData, 'coverImage', onChange);
                }}
              />
              <span className=' flex h-[36px] items-center rounded-[5px] bg-[#F0F7FC] px-[16px] py-[5px] text-[14px] font-[700] text-primary_blue'>
                {loading ? <Loading /> : t('upload_image')}
              </span>
            </label>
          </>
        );
      }}
    </Field>
  );
};
export default UpLoadCover;
