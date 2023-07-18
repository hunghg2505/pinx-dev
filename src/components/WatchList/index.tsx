import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';
import Slider from 'react-slick';

import { ITheme, IWatchListItem, useGetTheme } from '@components/Home/service';
import { Button } from '@components/UI/Button';
import Text from '@components/UI/Text';

import ComponentWatchList from './ComponentWatchList';
import styles from './index.module.scss';
import InterestItem from './InterestItem';
import ModalAddStock from './ModalAddStock';
import { useGetInterest } from './service';
import ThemeItem from './ThemeItem';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  // autoplay: true,
  // autoplaySpeed: 1000,
};

const WatchList = () => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const router = useRouter();
  const { theme } = useGetTheme();

  const onGoBack = () => {
    router.back();
  };
  const { interestStock, refresh } = useGetInterest();

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSort = () => {
    // console.log('sort');
    // @ts-ignore
    // dataItemStock.slice(0.4).sort((a, b) => a.codeStock - b.codeStock);
  };

  return (
    <div className='flex flex-col gap-y-[32px] pb-[52px] pt-[20px] desktop:gap-y-[20px] desktop:p-[24px] desktop:pb-[32px]'>
      <div className='flex flex-col gap-y-[16px] desktop:gap-y-[20px]'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='w-[28px] cursor-pointer desktop:hidden'
          onClick={onGoBack}
        />
        {isEdit ? (
          <>
            <div className='relative flex items-center'>
              <div className='flex'>
                <div className='flex min-h-[28px] items-center'>
                  <Text
                    type='body-12-semibold'
                    className='text-[#1F6EAC]'
                    onClick={() => setIsEdit(false)}
                  >
                    Cancel
                  </Text>
                </div>
              </div>
              <div
                onClick={handleSort}
                className='absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]'
              >
                <img
                  src='/static/icons/iconFilterSortaz.svg'
                  alt=''
                  className='h-[28px] w-[28px]'
                />
              </div>
              <div className='ml-auto flex'>
                <div className='flex min-h-[28px] items-center'>
                  <Button className='flex min-h-[24px] min-w-[76px] items-center justify-center rounded-full bg-[#589DC0]'>
                    <Text type='body-12-medium' color='cbwhite'>
                      Save
                    </Text>
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='flex items-center justify-between'>
            <Text type='body-20-bold' color='neutral-1' className='desktop:!text-[28px]'>
              Watchlist
            </Text>
            <Button
              onClick={() => setIsEdit(true)}
              className='flex items-center justify-center desktop:min-h-[34px] desktop:min-w-[135px] desktop:rounded-[5px] desktop:bg-[#EEF5F9]'
            >
              <img
                src='/static/icons/explore/iconEdit.svg'
                alt=''
                className='mr-[4px] h-[13px] w-[13px]'
              />
              <Text type='body-14-semibold' color='primary-2'>
                Edit list
              </Text>
            </Button>
          </div>
        )}

        <ComponentWatchList isEdit={isEdit} />
        {isEdit && (
          <ModalAddStock>
            <div className='flex min-h-[68px] cursor-pointer items-center justify-center gap-x-[12px] rounded-[12px] border-[1px] border-dashed border-[#B1D5F1] hover:border-[#1F6EAC]'>
              <img src='/static/icons/iconAddPlus.svg' alt='' className='h-[28px] w-[29px]' />
              <Text type='body-14-semibold' className='text-[#1F6EAC]'>
                Add new
              </Text>
            </div>
          </ModalAddStock>
        )}
      </div>
      {!isEdit && (
        <div className='flex flex-col gap-y-[16px]'>
          <Text type='body-20-bold' className='text-[#0D0D0D]'>
            You may interest
          </Text>
          <div
            className={classNames(
              'ml-[-16px] mr-[-16px] flex gap-x-[16px] overflow-x-auto pb-[16px] pr-[16px] desktop:ml-[-24px] desktop:mr-[-24px] desktop:pr-[24px]',
              styles.listInterest,
            )}
          >
            {interestStock?.map((item: IWatchListItem, index: number) => (
              <div
                key={index}
                className='relative min-h-[172px] w-[112px] flex-none rounded-[12px] bg-[#f9f9f9] px-[14px] pb-[12px] pt-[16px] first:ml-[16px] desktop:first:ml-[24px]'
              >
                <InterestItem data={item} refresh={refresh} />
              </div>
            ))}
          </div>
        </div>
      )}
      {!isEdit && (
        <Slider {...settings}>
          {theme?.map((item: ITheme, index: number) => {
            return (
              <div key={`them-${index}`}>
                <ThemeItem data={item} />
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
};
export default WatchList;
