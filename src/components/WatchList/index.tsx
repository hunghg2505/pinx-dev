import React from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import Slider from 'react-slick';

import { Button } from '@components/UI/Button';
import PopupAddNewStock from '@components/UI/Popup/PopupAddNewStock';
import Text from '@components/UI/Text';
// import ItemInterest from './ItemInterest';
// import ItemStock from './ItemStock';
// import {da} from "date-fns/locale";
// import {IStockTheme} from "@components/Themes/service";
import { initialPopupStatus, popupStatusAtom } from '@store/popup/popup';

import styles from './index.module.scss';


const dataItemStock = [
  {
    img: 'https://picsum.photos/48/48/?random',
    codeStock: 'VNM',
    exChange: 'HOSE',
    companyName: 'CTCP Tập đoàn Đầu tư Địa ốc NoVa',
  },
  {
    img: 'https://picsum.photos/48/48/?random',
    codeStock: 'HAG',
    exChange: 'VNINDEX',
    companyName: 'CTCP Tập đoàn Đầu tư Địa ốc NoVa',
  },
  {
    img: 'https://picsum.photos/48/48/?random',
    codeStock: 'VIC',
    exChange: 'VN30',
    companyName: 'CTCP Tập đoàn VNM',
  },
  {
    img: 'https://picsum.photos/48/48/?random',
    codeStock: 'VIC',
    exChange: 'HNX',
    companyName: 'CTCP Tập đoàn VNM',
  },
];

const dataItemInterest = [
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
  {
    img: 'https://picsum.photos/48/48/?random1',
  },
];

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
  const [isEdit, setIsEdit] = React.useState<boolean>(true);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };

  const onCloseModal = () => {
    setPopupStatus(initialPopupStatus);
  };

  const handleAddNewStock = () => {
    setPopupStatus({
      ...popupStatus,
      popupAddNewStock: true,
    });
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleSort = () => {
    // console.log('sort');
    // @ts-ignore
    dataItemStock.slice(0.4).sort((a, b) => a.codeStock - b.codeStock);
  };

  if (isEdit) {
    return (
      <>
        {popupStatus.popupAddNewStock && (
          <PopupAddNewStock visible={popupStatus.popupAddNewStock} onClose={onCloseModal} />
        )}
        <div className='pt-[20px] flex flex-col gap-y-[20px] desktop:px-[24px] desktop:py-[20px]'>
          {/* Top */}
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
              <img src='/static/icons/iconFilterSortaz.svg' alt='' className='h-[28px] w-[28px]' />
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
          {/* /Top */}

          {/* Divider */}
          <div className='min-h-[1px] desktop:ml-[-24px] desktop:mr-[-24px] desktop:bg-[#EEF5F9]'></div>
          {/* /Divider */}

          <div className='flex flex-col gap-y-[16px]'>
            {dataItemStock.map((item, index) => (
              <div
                key={index}
                className='relative flex items-center justify-between rounded-[12px] border-b-[1px] border-solid border-[#EBEBEB] bg-[#ECECEC] p-[12px]'
              >
                <div className='flex items-center gap-x-[10px]'>
                  <img
                    src={item.img + index}
                    alt=''
                    className='h-[36px] w-[36px] rounded-full tablet:h-[48px] tablet:w-[48px]'
                  />
                  <div className='flex flex-col gap-y-[4px]'>
                    <div className='flex gap-x-[4px]'>
                      <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                        {item.codeStock}
                      </Text>
                      <Text
                        type='body-10-regular'
                        className='text-#394251 rounded-[4px] border-[1px] border-solid border-[#EBEBEB] bg-[#fff] px-[7px] py-[2px] leading-[16px]'
                      >
                        {item.exChange}
                      </Text>
                    </div>
                    <Text type='body-12-regular' className='max-w-[155px] text-[#474D57]'>
                      {item.companyName}
                    </Text>
                  </div>
                </div>
                <div className='flex pr-[12px]'>
                  <img src='/static/icons/iconSwitch.svg' alt='' className='h-[21px] w-[20px]' />
                  <img
                    src='/static/icons/iconCloseBlue.svg'
                    alt=''
                    className='absolute -right-2 -top-2 h-[18px] w-[18px]'
                  />
                </div>
              </div>
            ))}
            <div
              onClick={handleAddNewStock}
              className='flex min-h-[68px] cursor-pointer items-center justify-center gap-x-[12px] rounded-[12px] border-[1px] border-dashed border-[#B1D5F1] hover:border-[#1F6EAC]'
            >
              <img src='/static/icons/iconAddPlus.svg' alt='' className='h-[28px] w-[29px]' />
              <Text type='body-14-semibold' className='text-[#1F6EAC]'>
                Add new
              </Text>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className='pt-[20px] flex flex-col gap-y-[32px] pb-[52px] desktop:gap-y-[20px] desktop:p-[24px] desktop:pb-[32px]'>
      <div className='flex flex-col gap-y-[16px] desktop:gap-y-[20px]'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='w-[28px] cursor-pointer desktop:hidden'
          onClick={onGoBack}
        />
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
        <div className='flex flex-col gap-y-[16px]'>
          {dataItemStock.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between rounded-[12px] p-[12px] tablet-max:bg-[#F7F6F8] desktop:rounded-none desktop:border-b-[1px] desktop:border-solid desktop:border-[#EBEBEB] desktop:px-0 desktop:py-[10px]'
            >
              <div className='flex items-center gap-x-[10px]'>
                <img
                  src={item.img + index}
                  alt=''
                  className='h-[36px] w-[36px] rounded-full tablet:h-[48px] tablet:w-[48px]'
                />
                <div className='flex flex-col gap-y-[4px]'>
                  <div className='flex gap-x-[4px]'>
                    <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                      {item.codeStock}
                    </Text>
                    <Text
                      type='body-10-regular'
                      className='text-#394251 rounded-[4px] border-[1px] border-solid border-[#EBEBEB] bg-[#fff] px-[7px] py-[2px] leading-[16px]'
                    >
                      {item.exChange}
                    </Text>
                  </div>
                  <Text type='body-12-regular' className='max-w-[155px] text-[#999]'>
                    {item.companyName}
                  </Text>
                </div>
              </div>
              <div className='flex flex-col items-end gap-y-[5px]'>
                <Text type='body-14-semibold' className='text-[#128F63]'>
                  43.95
                </Text>
                <Text type='body-12-medium' className='text-[#128F63]'>
                  +0.45 / +1.02%
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>

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
          {dataItemInterest.map((item, index) => (
            <div
              key={index}
              className='relative min-h-[172px] w-[112px] flex-none rounded-[12px] bg-[#f9f9f9] px-[14px] pb-[12px] pt-[16px] first:ml-[16px] desktop:first:ml-[24px]'
            >
              <div className='flex flex-col gap-y-[16px]'>
                <img
                  src={item.img + index}
                  alt=''
                  className='m-auto h-[40px] w-[40px] rounded-full'
                />
                <div className='flex flex-col gap-y-[8px] text-center'>
                  <Text type='body-14-semibold' className='text-[#128F63]'>
                    43.95
                  </Text>
                  <Text type='body-14-regular' className='text-[#0D0D0D]'>
                    VNM
                  </Text>
                  <div>
                    <Text
                      type='body-12-medium'
                      className='ml-[-14px] mr-[-14px] whitespace-nowrap px-[0px] py-[4px] text-[#128F63]'
                    >
                      +0.45 / +1.02%
                    </Text>
                    <div
                      className={classNames(
                        'absolute bottom-[-10px] left-1/2 flex h-[24px] w-[24px] translate-x-[-50%] cursor-pointer items-center justify-center rounded-full bg-[#fff]',
                        styles.heart,
                      )}
                    >
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M0 8C0 3.58065 3.58065 0 8 0C12.4194 0 16 3.58065 16 8C16 12.4194 12.4194 16 8 16C3.58065 16 0 12.4194 0 8ZM8.41613 12.4677L11.9839 8.78387C13.0226 7.7129 12.9613 5.93871 11.8065 4.95161C10.7968 4.09032 9.29355 4.24516 8.36774 5.2L8.00323 5.57419L7.63871 5.2C6.7129 4.24516 5.20968 4.09032 4.2 4.95161C3.04194 5.93871 2.98065 7.7129 4.01613 8.78387L7.58065 12.4677C7.8129 12.7065 8.1871 12.7065 8.41613 12.4677Z'
                          fill='black'
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Slider {...settings}>
        {dataItemInterest.map(() => (
          // eslint-disable-next-line react/jsx-key
          <div className='relative overflow-hidden rounded-[16px]'>
            <img
              src='https://picsum.photos/701/467'
              alt=''
              className='aspect-[331/467] object-cover desktop:aspect-[701/467]'
            />
            <div className='px-[12px] desktop:px-[24px] flex flex-col justify-end gap-y-[8px] py-[16px] absolute inset-x-0 inset-y-0 desktop:top-1/2 bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.00)_0%,_rgba(0,_0,_0,_0.00)_62.86%,_rgba(0,_0,_0,_0.80)_100%)]'>
              <Text type='body-20-semibold' color='cbwhite'>Industrial park technology</Text>
              <Text color='cbwhite' className='text-[12px] desktop:text-[14px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus.</Text>
            </div>
            <div className='absolute top-0 right-0 left-0 px-[20px] py-[20px] flex items-start justify-between'>
              <img
                src='/static/icons/Lotus-white.svg'
                alt=''
                className='h-[24px] desktop:h-[32px] w-[24px] desktop:w-[32px]'
              />
              <div className='flex flex-col gap-y-[4px] text-right'>
                <div className='flex'>
                  <img
                    src='https://picsum.photos/20/20?random=1'
                    alt=''
                    className='h-[20px] w-[20px] rounded-full mr-[-5px] last:mr-0 border-[1px] border-solid border-[_rgba(248,_250,_253,_0.20)]'
                  />
                  <img
                    src='https://picsum.photos/20/20?random=2'
                    alt=''
                    className='h-[20px] w-[20px] rounded-full mr-[-5px] last:mr-0'
                  />
                  <img
                    src='https://picsum.photos/20/20?random=3'
                    alt=''
                    className='h-[20px] w-[20px] rounded-full mr-[-5px] last:mr-0'
                  />
                </div>
                <Text color='cbwhite' className='text-[12px] desktop:text-[14px]'>3000+</Text>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default WatchList;
