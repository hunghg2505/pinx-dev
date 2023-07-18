import React, { useState } from 'react';

import { useRouter } from 'next/router';

import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { IMAGE_COMPANY_URL } from '@utils/constant';

import PopupAlsoOwn from '../Popup/PopupAlsoOwn';
import { ISubsidiaries } from '../type';

interface IAlsoOwnItemProps {
  data: ISubsidiaries;
}

const AlsoOwnItem = ({ data }: IAlsoOwnItemProps) => {
  const [popup, setPopup] = useState<{
    visible: boolean;
    data?: ISubsidiaries;
  }>({
    visible: false,
    data: undefined,
  });
  const router = useRouter();

  const urlImageCompany = `${
    data.stockCode && (data?.stockCode?.length === 3 || data?.stockCode[0] !== 'C')
      ? data?.stockCode
      : data?.stockCode?.slice(1, 4)
  }.png`;

  const handleClickStock = () => {
    if (data.listed) {
      router.push(ROUTE_PATH.STOCK_DETAIL(data.stockCode));
    } else {
      setPopup({ data, visible: true });
    }
  };

  return (
    <>
      <div className='flex cursor-pointer items-center' onClick={handleClickStock}>
        <div className='flex h-[81px] w-[81px] items-center justify-center'>
          {data.listed ? (
            <img
              src={IMAGE_COMPANY_URL + urlImageCompany}
              alt={`Logo ${data.name}`}
              className='block h-full w-full object-contain'
            />
          ) : (
            <img
              src='/static/images/defaultCompanyLogo.png'
              alt='Default logo'
              className='block h-[52px] w-[52px] object-contain'
            />
          )}
        </div>

        <div className='ml-[10px] flex-1'>
          <div className='mb-[4px]'>
            {data.stockCode && data.stockExchange ? (
              <div className='flex items-center'>
                <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                  {data.stockCode}
                </Text>

                <div className='ml-[4px] flex h-[20px] min-w-[36px] items-center justify-center rounded-[4px] bg-[#F7F6F8] px-[6px]'>
                  <Text type='body-10-regular' className='text-[#999999]'>
                    {data.stockExchange}
                  </Text>
                </div>
              </div>
            ) : (
              <div className='inline-flex h-[20px] items-center justify-center rounded-[4px] border border-solid border-[#EBEBEB] px-[8px]'>
                <Text type='body-10-regular' color='primary-5'>
                  UNLISTED
                </Text>
              </div>
            )}
          </div>
          <Text type='body-12-regular' className='text-[#999999]'>
            {data.name}
          </Text>
        </div>

        <div className='ml-auto flex items-center pl-[8px]'>
          <Text type='body-16-semibold' className='text-[#0D0D0D]'>
            {data.ownerRatio}%
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
        visible={popup.visible}
        data={popup.data}
        onClose={() => {
          setPopup({
            data: undefined,
            visible: false,
          });
        }}
      />
    </>
  );
};

export default AlsoOwnItem;
