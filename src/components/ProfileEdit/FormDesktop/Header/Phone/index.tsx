import React, { useContext } from 'react';

import { profileUserContext } from '@components/ProfileEdit';
import Text from '@components/UI/Text';

const Phone = () => {
  const profileUser = useContext<any>(profileUserContext);

  return (
    <Text
      type='body-14-regular'
      color='neutral-black'
      className='absolute left-[calc(16px+113px/2)] top-[calc(100%+90px)] -translate-x-1/2 tablet:left-[calc(10px+100px/2)] tablet:top-[calc(100%+85px)] xdesktop:left-[calc(32px+120px/2)] xdesktop:top-[calc(100%+90px)]'
    >
      {profileUser?.phone}
    </Text>
  );
};
export default Phone;
