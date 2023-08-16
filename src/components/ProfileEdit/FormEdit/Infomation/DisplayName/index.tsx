import React from 'react';

import { useTranslation } from 'next-i18next';
import { Field } from 'rc-field-form';

import Text from '@components/UI/Text';

const DisplayName = () => {
  const { t } = useTranslation('editProfile');
  return (
    <Field
      name='displayName'
      rules={[
        {
          required: true,
          message: t('message.display_name_require'),
        },
      ]}
    >
      {({ value, onChange }, meta) => {
        const { errors } = meta;
        const hasError: string = errors && errors[0];

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
              className='line-[21px] mb-[12px] w-full py-2 text-[16px] text-neutral_black outline-none'
            />

            <div className='mb-[24px]'>
              <hr className='border-neutral_07' />

              {hasError && (
                <Text type='body-14-regular' className='mt-[4px] text-left text-[#DA314F]'>
                  {hasError}
                </Text>
              )}
            </div>
          </>
        );
      }}
    </Field>
  );
};
export default DisplayName;
