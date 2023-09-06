import React from 'react';

import { Field } from 'rc-field-form';

import { replaceImageError } from '@utils/common';

const Img = () => {
  return (
    <Field name='avatar'>
      {({ value }) => {
        return (
          <div className='h-[113px] w-[113px] rounded-full bg-white p-[5px] tablet:h-[100px] tablet:w-[100px] xdesktop:h-[120px] xdesktop:w-[120px]'>
            <img
              src={value}
              alt='background cover'
              onError={replaceImageError}
              className='block h-full w-full rounded-full border border-solid border-[#ebebeb] object-cover'
            />
          </div>
        );
      }}
    </Field>
  );
};
export default Img;
