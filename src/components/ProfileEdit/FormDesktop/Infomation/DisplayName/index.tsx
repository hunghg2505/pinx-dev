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
            <input
              type='text'
              value={value}
              onChange={onChange}
              maxLength={256}
              placeholder={t('enter_display_name')}
              className='line-[18px] mb-[12px] w-full rounded-[5px] bg-neutral_08 px-[16px] py-[12px]  text-[14px] text-neutral_black outline-none'
            />
          </>
        );
      }}
    </Field>
  );
};
export default DisplayName;
