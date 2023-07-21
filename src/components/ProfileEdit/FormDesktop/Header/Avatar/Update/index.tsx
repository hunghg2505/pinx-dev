import React from 'react';

import { useTranslation } from 'next-i18next';
import { Field } from 'rc-field-form';

const Update = () => {
  const { t } = useTranslation('editProfile');
  return (
    <Field name='file'>
      <Field name='avatar'>
        {({ onChange }, _, form) => {
          return (
            <>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e: any) => {
                  form.setFieldValue('file', e.target.files[0]);
                  onChange(URL.createObjectURL(e.target.files[0]));
                }}
              />
              <button
                type='button'
                className='absolute left-[50px] top-[-32px] h-[36px] translate-x-[-50%] whitespace-nowrap rounded-[5px] bg-[#F0F7FC] px-[16px] py-[5px] text-[14px] font-[700] text-primary_blue'
              >
                {t('upload_image')}
              </button>
            </>
          );
        }}
      </Field>
    </Field>
  );
};
export default Update;
