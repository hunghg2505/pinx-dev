import React from 'react';

import { useTranslation } from 'next-i18next';
import { Field } from 'rc-field-form';

import { useUploadImage } from '@components/ProfileEdit/FormDesktop/service';

const Update = () => {
  const { t } = useTranslation('editProfile');
  const { run } = useUploadImage();
  return (
    <Field name='avatar'>
      {({ onChange }) => {
        return (
          <>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e: any) => {
                const formData = new FormData();
                formData.append('files', e.target.files[0]);
                run(formData, 'coverImage', onChange);
              }}
            />
            <p className='absolute left-[50px] top-[-32px] flex  h-[36px] translate-x-[-50%] items-center whitespace-nowrap rounded-[5px] bg-[#F0F7FC] px-[16px] py-[5px] text-[14px] font-[700] text-primary_blue'>
              {t('upload_image')}
            </p>
          </>
        );
      }}
    </Field>
  );
};
export default Update;
