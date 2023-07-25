import React from 'react';

import { useTranslation } from 'next-i18next';
import { Field } from 'rc-field-form';

import Editor from './Editor';

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
            <Editor value={value} onChange={onChange} />
            <hr className='mb-[24px] border-neutral_07' />
          </>
        );
      }}
    </Field>
  );
};
export default JobsTitle;
