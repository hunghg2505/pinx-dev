import React from 'react';

import { Field } from 'rc-field-form';

const Img = () => {
  return (
    <Field name='avatar'>
      {({ value }) => {
        return (
          <img
            src={value}
            alt='background cover'
            className='h-[100px] w-[100px] rounded-full bg-white tablet:p-[8px]'
          />
        );
      }}
    </Field>
  );
};
export default Img;
