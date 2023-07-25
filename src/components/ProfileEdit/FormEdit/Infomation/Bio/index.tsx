import React from 'react';

import { useTranslation } from 'next-i18next';
import { Field } from 'rc-field-form';

import Editor from './Editor';

const Bio = () => {
  const { t } = useTranslation('editProfile');
  return (
    <Field name='bio'>
      {({ value, onChange }) => {
        return (
          <>
            <label
              htmlFor='displayName'
              className='line-[16px] mb-[12px] block text-[12px] text-neutral_gray'
            >
              {t('Bio')}
            </label>
            <Editor value={value} onChange={onChange} />
            <hr className='mb-[24px] border-neutral_07' />
          </>
        );
      }}
    </Field>
  );
};
export default Bio;
