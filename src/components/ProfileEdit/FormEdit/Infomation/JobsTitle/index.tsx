import React from 'react';

import { useTranslation } from 'next-i18next';
import { Field } from 'rc-field-form';

const JobsTitle = () => {
  const { t } = useTranslation('editProfile');
  return (
    <Field name='position'>
      {({ value, onChange }) => {
        return (
          <>
            <label
              htmlFor='JobsTitle'
              className='line-[16px] mb-[12px] block text-[12px] text-neutral_gray'
            >
              {t('job_title')}
            </label>
            <input
              type='text'
              value={value}
              onChange={onChange}
              className='line-[21px] mb-[12px] w-full py-2 text-[16px] text-neutral_black outline-none'
            />
            <hr className='mb-[24px] border-neutral_07' />
          </>
        );
      }}
    </Field>
  );
};
export default JobsTitle;
