import React, { createContext, useReducer } from 'react';

import Figure from './Figure';
import Caption from './Figure/Caption';
import Follow from './Follow';
import UnFollow from './UnFollow';

export const followContext = createContext<any>(undefined);
const tasksReducer = (profile: any, action: { type: string }) => {
  switch (action.type) {
    case 'unFollow': {
      return { ...profile, isFollowed: false };
    }
    case 'follow': {
      return { ...profile, isFollowed: true };
    }
    default: {
      throw new Error('Unknown action: ');
    }
  }
};
const UserFolowDesktop = (props: any) => {
  const [tasks, dispatch] = useReducer(tasksReducer, props);
  return (
    <followContext.Provider value={{ ...tasks, dispatch }}>
      <div className='shadow-[0px_4px_13px_0px_rgba(88, 157, 192, 0.30)] relative overflow-hidden rounded-[12px] pt-[156%]'>
        <Figure />
        <Caption />
        {tasks?.isFollowed ? <UnFollow /> : <Follow />}
      </div>
    </followContext.Provider>
  );
};
export default UserFolowDesktop;
