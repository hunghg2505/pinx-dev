import React from 'react';

const Position = ({ position }: { position: string }) => {
  return (
    <p className='mb-[8px] line-clamp-2 w-[350px] text-[14px] font-[400] text-[#394251]'>
      {position}
    </p>
  );
};
export default Position;
