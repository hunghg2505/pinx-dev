import React, { createContext } from 'react';

import Bio from './Bio';
import DisplayName from './DisplayName';
import JobsTitle from './JobsTitle';
import Name from './Name';
import Save from './Save';

export const profileUserContext = createContext(undefined);

const Info = () => {
  return (
    <div className='bg-white px-[16px] pb-[32px] pt-[21px] xdesktop:pt-[26px]'>
      <div className='pl-[159px] tablet:pl-[125px] xdesktop:pl-[188px]'>
        <Name />
        <DisplayName />
        <JobsTitle />
      </div>
      <Bio />
      <Save />
    </div>
  );
};
export default Info;
