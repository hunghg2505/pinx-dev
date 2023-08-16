import React from 'react';

import { useTranslation } from 'next-i18next';
import { Field } from 'rc-field-form';

const DisplayName = () => {
  const { t } = useTranslation('editProfile');
  return (
    <Field name='displayName'>
      {({ value, onChange }) => {
        return (
          <>
            <label
              htmlFor='displayName'
              className='line-[16px] mb-[12px] block text-[12px] text-neutral_gray'
            >
              {t('display_name')}
            </label>
            <input
              type='text'
              value={value}
              onChange={onChange}
              maxLength={256}
              className='line-[21px] mb-[12px] w-full py-2 text-[16px] text-neutral_black outline-none galaxy-max:text-[14px]'
            />
            <hr className='mb-[24px] border-neutral_07' />
          </>
        );
      }}
    </Field>
  );
};
export default DisplayName;
