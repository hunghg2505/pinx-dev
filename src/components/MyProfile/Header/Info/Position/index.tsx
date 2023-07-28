import React from 'react';

const Position = ({ position }: { position: string }) => {
  return (
    <p className='w-[max(calc(100%-188px),300px)] mb-[21px] truncate text-[14px] font-[400] text-dark_grey tablet:absolute tablet:bottom-[calc(100%+8px)] tablet:mb-0 tablet:text-[14px]'>
      {position}
    </p>
  );
};
export default Position;
