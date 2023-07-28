import React from 'react';

const Position = ({ position }: { position: string }) => {
  return (
    <p className='mb-[21px] line-clamp-2 w-[350px] text-[14px] font-[400] text-dark_grey'>
      {position}
    </p>
  );
};
export default Position;
