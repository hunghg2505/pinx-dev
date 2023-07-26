import React from 'react';

const IconPlus = () => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={36}
        height={36}
        viewBox='0 0 36 36'
        fill='none'
      >
        <rect width={36} height={36} rx={18} fill='#589DC0' />
        <path
          d='M18 7.5V28.5M7.5 18H28.5'
          stroke='white'
          strokeWidth={3}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </>
  );
};

export default IconPlus;
