import React from 'react';

import Text from '@components/UI/Text';

const Empty = ({ keyword }: { keyword:string }) => {
  return (
    <div className='flex flex-col gap-y-[24px] items-center'>
      <img
        src='/static/icons/icon_robot.svg'
        alt='Robot icon'
        className='m-auto h-[163px] w-[209px]'
      />
      <div className='flex flex-col gap-y-[8px] items-center'>
        <Text type='body-22-bold' className='text-[#333]'>No result found for “{keyword}”</Text>
        <Text type='body-14-regular' className='text-[#333]'>We are sorry, but the page you are looking for does not exist.</Text>
      </div>
    </div>
  );
};
export default Empty;
