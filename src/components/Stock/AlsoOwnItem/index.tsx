import React, { useState } from 'react';

import Text from '@components/UI/Text';

import PopupAlsoOwn from '../Popup/PopupAlsoOwn';

const AlsoOwnItem = () => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <div className='flex cursor-pointer items-center' onClick={() => setOpenPopup(true)}>
        <div className='flex h-[81px] w-[81px] items-center justify-center'>
          {/* <img
            src='/static/images/mbs_logo.png'
            alt='Mbs logo'
            className='block h-full w-full object-contain'
          /> */}

          <img
            src='/static/images/defaultCompanyLogo.png'
            alt='Default logo'
            className='block h-[52px] w-[52px] object-contain'
          />
        </div>

        <div className='ml-[10px]'>
          <div className='mb-[4px]'>
            {/* <div className='flex items-center'>
            <Text type='body-16-semibold' className='text-[#0D0D0D]'>
              MBS
            </Text>

            <div className='ml-[4px] flex h-[20px] min-w-[36px] items-center justify-center rounded-[4px] bg-[#F7F6F8] px-[6px]'>
              <Text type='body-10-regular' className='text-[#999999]'>
                HNX
              </Text>
            </div>
          </div> */}

            <div className='inline-flex h-[20px] items-center justify-center rounded-[4px] border border-solid border-[#EBEBEB] px-[8px]'>
              <Text type='body-10-regular' color='primary-5'>
                UNLISTED
              </Text>
            </div>
          </div>
          <Text type='body-12-regular' className='text-[#999999]'>
            MB Securities JSC
          </Text>
        </div>

        <div className='ml-auto flex items-center pl-[8px]'>
          <Text type='body-16-semibold' className='text-[#0D0D0D]'>
            43.95%
          </Text>

          <div className='px-[7px]'>
            <img
              src='/static/icons/iconBlackRight.svg'
              alt='Chevron right icon'
              className='h-[9px] w-[5px] object-contain'
            />
          </div>
        </div>
      </div>

      <PopupAlsoOwn
        visible={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
      />
    </>
  );
};

export default AlsoOwnItem;
