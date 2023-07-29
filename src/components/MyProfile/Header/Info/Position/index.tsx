import React from 'react';

const Position = ({ position }: { position: string }) => {
  return (
    <p className='mb-[8px] line-clamp-2 text-[14px] font-[400] text-[#394251] tablet:max-w-[350px]'>
      {position}
    </p>
  );
};
export default Position;
