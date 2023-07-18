import React, { createContext } from 'react';

import Avatar from './Avatar';
import Back from './Back';
import Name from './Name';
import Phone from './Phone';
import Save from './Save';
import Verify from './Verify';

export const profileUserContext = createContext(undefined);

const Header = () => {
  return (
    <div className='bg-white px-[16px] '>
      <div className='flex items-center justify-between py-[16px]'>
        <Back />
        <Save />
      </div>
      <div className='mb-[10px] flex text-center'>
        <div className='mx-auto'>
          <Avatar />
          <Name />
          <Phone />
          <Verify />
        </div>
      </div>
    </div>
  );
};
export default Header;
