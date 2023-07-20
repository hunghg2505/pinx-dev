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
            className='h-[174px] w-[174px] rounded-full shadow-lg tablet:h-[100px] tablet:w-[100px] object-cover'
          />
        );
      }}
    </Field>
  );
};
export default Img;
