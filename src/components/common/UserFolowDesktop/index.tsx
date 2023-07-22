import React, { createContext } from 'react';

import Figure from './Figure';
import Caption from './Figure/Caption';
import Follow from './Follow';
import UnFollow from './UnFollow';

export const followContext = createContext<any>(undefined);

const UserFolowDesktop = (props: any) => {
  return (
    <followContext.Provider
      value={{
        ...props,
      }}
    >
      <div className='shadow-[0px_4px_13px_0px_rgba(88, 157, 192, 0.30)] relative overflow-hidden rounded-[12px] pt-[156%]'>
        <Figure />
        <Caption />
        {props?.isFollowed ? <UnFollow /> : <Follow />}
      </div>
    </followContext.Provider>
  );
};
export default UserFolowDesktop;
