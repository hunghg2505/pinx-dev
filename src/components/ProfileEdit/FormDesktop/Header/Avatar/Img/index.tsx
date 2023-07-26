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
            className='h-[140px] w-[140px] rounded-full bg-white tablet:p-[5px] object-cover'
          />
        );
      }}
    </Field>
  );
};
export default Img;
