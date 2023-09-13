import React from 'react';

import { Field } from 'rc-field-form';

import CustomImage from '@components/UI/CustomImage';

const Img = () => {
  return (
    <Field name='avatar'>
      {({ value }) => {
        console.log('🚀 ~ file: index.tsx:11 ~ Img ~ value:', value);
        return (
          <div className='h-[113px] w-[113px] rounded-full bg-white p-[5px] tablet:h-[100px] tablet:w-[100px] xdesktop:h-[120px] xdesktop:w-[120px]'>
            <CustomImage
              width='0'
              height='0'
              sizes='100vw'
              src={value}
              alt='background cover'
              className='block h-full w-full rounded-full border border-solid border-[#ebebeb] object-cover'
            />
          </div>
        );
      }}
    </Field>
  );
};
export default Img;
