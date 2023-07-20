import React, { createContext } from 'react';

import Avatar from './Avatar';
import Back from './Back';
import Cover from './Cover';
import Phone from './Phone';
import Verify from './Verify';

export const profileUserContext = createContext(undefined);

const Header = () => {
  return (
    <div className='bg-white px-[16px]'>
      <div className='flex items-center justify-between py-[16px]'>
        <Back />
      </div>
      <div className='relative  pt-[21%]'>
        <Cover />
        <div className='mx-auto'>
          <Avatar />
          <Phone />
          <Verify />
        </div>
      </div>
    </div>
  );
};
export default Header;
