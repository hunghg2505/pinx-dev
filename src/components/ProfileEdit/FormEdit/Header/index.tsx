import React, { createContext } from 'react';

// eslint-disable-next-line import/named
import { FormInstance } from 'rc-field-form';

import Avatar from './Avatar';
import Back from './Back';
import Name from './Name';
import Phone from './Phone';
import Save from './Save';
import Verify from './Verify';

export const profileUserContext = createContext(undefined);

const Header = ({ form }: { form: FormInstance }) => {
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between py-[16px]'>
        <Back />
        <Save />
      </div>
      <div className='mb-[10px] flex text-center'>
        <div className='mx-auto'>
          <Avatar form={form} />
          <Name />
          <Phone />
          <Verify />
        </div>
      </div>
    </div>
  );
};
export default Header;
