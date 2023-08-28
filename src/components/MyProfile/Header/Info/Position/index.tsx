import React from 'react';

const Position = ({ position }: { position: string }) => {
  return (
    <p className='mb-[8px] line-clamp-2 max-w-[350px] pr-[32px] text-[14px] font-[400] text-[#394251] galaxy-max:max-w-[200px] galaxy-max:pr-0 galaxy-max:text-[12px] tablet:pr-0'>
      {position}
    </p>
  );
};
export default Position;
