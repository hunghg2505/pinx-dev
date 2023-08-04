import React from 'react';

const Notifications = () => {
  return (
    <>
      <div className=' ta flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#F8F8F8]'>
        <img
          src='/static/icons/iconBell.svg'
          alt='Icon notification'
          className='h-[23px] w-[23px]'
        />
      </div>
    </>
  );
};

export default Notifications;
