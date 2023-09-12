import React from 'react';

import Image from 'next/image';
import { Field } from 'rc-field-form';

const Img = () => {
  return (
    <Field name='avatar'>
      {({ value }) => {
        return (
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={value}
            alt='background cover'
            className='h-[174px] w-[174px] rounded-full object-cover shadow-lg tablet:h-[100px] tablet:w-[100px]'
          />
        );
      }}
    </Field>
  );
};
export default Img;
