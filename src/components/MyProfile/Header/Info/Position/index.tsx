import React from 'react';

const Position = ({ position }: { position: string }) => {
  return (
    <p className='mb-[8px] line-clamp-2 max-w-[350px] pr-[32px] text-[14px] font-[400] text-[#394251] tablet:pr-0'>
      {position}
    </p>
  );
};
export default Position;
