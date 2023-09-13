import React, { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { ROUTE_PATH, formatStringToNumber, imageStock } from '@utils/common';

import PopupAlsoOwn from '../Popup/PopupAlsoOwn';
import { ISubsidiaries } from '../type';

interface IAlsoOwnItemProps {
  data: ISubsidiaries;
}

const AlsoOwnItem = ({ data }: IAlsoOwnItemProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const [popup, setPopup] = useState<{
    visible: boolean;
    data?: ISubsidiaries;
  }>({
    visible: false,
    data: undefined,
  });
  const router = useRouter();

  const handleClickStock = () => {
    if (data.listed) {
      router.push(ROUTE_PATH.STOCK_DETAIL(data.stockCode));
    } else {
      setPopup({ data, visible: true });
    }
  };

  return (
    <>
      <div className='flex cursor-pointer items-center ' onClick={handleClickStock}>
        <div className='flex h-[81px] w-[81px] items-center justify-center galaxy-max:w-[56px] '>
          {data.listed ? (
            <div className='flex h-full w-full items-center justify-center overflow-hidden object-contain'>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                src={imageStock(data.stockCode)}
                // alt={`Logo ${data.name}`}
                alt=''
                className='block'
              />
            </div>
          ) : (
            <img
              src='/static/images/defaultCompanyLogo.png'
              alt='Default logo'
              className='block h-[52px] w-[52px] object-contain  galaxy-max:h-[48px] galaxy-max:w-[48px]'
            />
          )}
        </div>

        <div className='ml-[10px] flex-1'>
          <div className='mb-[4px]'>
            {data.stockCode && data.stockExchange ? (
              <div className='flex items-center'>
                <Text type='body-16-semibold' className='text-[#0D0D0D] galaxy-max:text-[14px]'>
                  {data.stockCode}
                </Text>

                <div className='ml-[4px] flex h-[20px] min-w-[36px] items-center justify-center rounded-[4px] bg-[#F7F6F8] px-[6px]'>
                  <Text type='body-10-regular' className='text-[#999999] galaxy-max:text-[8px]'>
                    {data.stockExchange}
                  </Text>
                </div>
              </div>
            ) : (
              <div className='inline-flex h-[20px] items-center justify-center rounded-[4px] border border-solid border-[#EBEBEB] px-[8px] galaxy-max:px-[4px]'>
                <Text
                  type='body-10-regular'
                  color='primary-5'
                  className='uppercase galaxy-max:text-[7px]'
                >
                  {t('unlisted')}
                </Text>
              </div>
            )}
          </div>
          <Text type='body-12-regular' className='text-[#999999] galaxy-max:text-[10px]'>
            {data.name}
          </Text>
        </div>

        <div className='ml-auto flex items-center pl-[8px]'>
          <Text type='body-16-semibold' className='text-[#0D0D0D] galaxy-max:text-[12px]'>
            {Number.isInteger(data.ownerRatio)
              ? data.ownerRatio
              : formatStringToNumber(String(data.ownerRatio), true, 2) || 0}
            %
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
