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
            className='h-[113px] w-[113px] rounded-full bg-white object-cover p-[5px] tablet:h-[100px] tablet:w-[100px] xdesktop:h-[120px] xdesktop:w-[120px]'
          />
        );
      }}
    </Field>
  );
};
export default Img;
