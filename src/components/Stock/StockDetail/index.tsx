import React, { useState } from 'react';

import classNames from 'classnames';
import Tabs, { TabPane } from 'rc-tabs';
import Slider from 'react-slick';

import Text from '@components/UI/Text';

import { DESCRIPTION, LIST_BUSINESS, SLIDER } from './const';
import IntradayTab from './IntradayTab';
import MatchingsTab from './MatchingsTab';
import MovementsTab from './MovementsTab';
import styles from '../index.module.scss';

const MAX_LINE = 3;
const LINE_HEIGHT = 16;

const settings = {
  dots: false,
  // infinite: true,
  speed: 500,
  slidesToShow: 1,
  // slidesToScroll: 1,
  swipeToSlide: true,
  // autoplay: true,
  // autoplaySpeed: 1000,
};

const StockDetail = () => {
  const [isSeeMore, setIsSeeMore] = useState(false);

  return (
    <div className='mobile:w-[375px]'>
      <div className='flex h-[44px] w-full items-center justify-between px-[16px]'>
        <div
          className='-ml-[16px] flex h-full items-center px-[16px]'
          onClick={() => {
            console.log('Back');
          }}
        >
          <img
            src='/static/icons/iconBack.svg'
            alt=''
            width='0'
            height='0'
            className='w-[18px] cursor-pointer'
          />
        </div>

        <button className='flex h-[32px] min-w-[117px] items-center justify-center rounded-full bg-[#F7F6F8] px-[10px]'>
          <img
            src='/static/icons/iconHeart2.svg'
            alt='Icon heart'
            className='h-[16px] w-[16px] object-contain'
          />

          <Text type='body-12-regular' className='ml-[8px] text-[#0D0D0D]'>
            Follow stock
          </Text>
        </button>
      </div>

      <div className='mt-[12px] flex items-center justify-between px-[16px]'>
        <div className='flex h-[44px] w-[44px] items-center rounded-[12px] border border-solid border-[#EEF5F9] bg-white px-[5px] shadow-[0_1px_2px_0_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
          <img src='/static/images/company_logo.png' alt='Logo company' className='block' />
        </div>

        <div className='flex items-center'>
          <Text type='body-12-regular' className='primary-5 -mr-[8px]'>
            46,086+
          </Text>

          <div className='flex items-center'>
            <img
              src='https://picsum.photos/200/100'
              alt='Subscriber user'
              className='block h-[28px] w-[28px] translate-x-[16px] rounded-full border border-solid border-[#EEF5F9] object-cover'
            />
            <img
              src='https://picsum.photos/200/100'
              alt='Subscriber user'
              className='block h-[28px] w-[28px] translate-x-[8px] rounded-full border border-solid border-[#EEF5F9] object-cover'
            />
            <img
              src='https://picsum.photos/200/100'
              alt='Subscriber user'
              className='z-10 block h-[28px] w-[28px] rounded-full border border-solid border-[#EEF5F9] object-cover'
            />
          </div>
        </div>
      </div>

      <div className='mt-[8px] flex items-center justify-between px-[16px]'>
        <div>
          <div className='flex items-center'>
            <Text type='body-24-semibold' className='text-[#0D0D0D]'>
              HPG
            </Text>

            <button className='ml-[8px] h-[20px] min-w-[48px] rounded-[4px] border border-solid border-[var(--neutral-7)] px-[10px]'>
              <Text type='body-10-regular' className='text-[#808A9D]'>
                HOSE
              </Text>
            </button>
          </div>

          <Text type='body-10-regular' className='primary-5'>
            CTCP Tập Đoàn Hòa Phát
          </Text>
        </div>

        <div className='text-right'>
          <Text type='body-16-medium' className='semantic-2-1'>
            23,000
          </Text>
          <Text type='body-12-regular' className='semantic-2-1'>
            +2.3 / 0.02%
          </Text>
        </div>
      </div>

      {/* chart */}
      <div className='mt-[8px] px-[16px]'></div>

      {/* tab */}
      <Tabs className={styles.tabs} defaultActiveKey='1'>
        <TabPane tab='Movements' tabKey='1'>
          <MovementsTab />
        </TabPane>

        <TabPane tab='Matchings' key='2'>
          <MatchingsTab />
        </TabPane>

        <TabPane tab='Intraday' key='3'>
          <IntradayTab />
        </TabPane>
      </Tabs>

      {/* intro */}
      <div className='mt-[28px] px-[16px]'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          Intro
        </Text>

        <div>
          <div
            style={{ lineHeight: `${LINE_HEIGHT}px`, height: `${LINE_HEIGHT * MAX_LINE}px` }}
            className={classNames('overflow-hidden', {
              '!h-auto': isSeeMore,
            })}
          >
            <Text type='body-12-regular' className='!leading-[inherit]'>
              {DESCRIPTION}
            </Text>
          </div>

          <button
            onClick={() => setIsSeeMore((prev) => !prev)}
            className='mt-[4px] h-[24px] min-w-[65px] rounded-full bg-[#EEF5F9] px-[12px]'
          >
            <Text type='body-12-semibold' color='primary-2'>
              {isSeeMore ? 'Less' : 'More'}
            </Text>
          </button>
        </div>
      </div>

      <div>
        <div className='mb-[16px] mt-[28px] px-[16px]'>
          <Text type='body-20-semibold'>Brand awareness</Text>
        </div>

        <div className='overflow-hidden pl-[16px]'>
          <Slider {...settings} variableWidth>
            {SLIDER.map((item, index) => (
              <div key={index} className='mr-[28px] !w-[112px]'>
                <img
                  src={item.image}
                  alt={item.title}
                  className='h-[112px] w-full rounded-[4px] object-cover'
                />

                <Text className='mt-[12px]' type='body-12-regular'>
                  {item.title}
                </Text>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* main business */}
      <div className='mt-[28px] px-[16px]'>
        <div className='mb-[4px]'>
          <Text type='body-20-semibold'>Main business</Text>
        </div>

        {LIST_BUSINESS.map((item, index) => (
          <div
            className='flex items-center border-b border-solid border-[var(--neutral-7)] py-[12px]'
            key={index}
            onClick={() => {
              console.log('business item');
            }}
          >
            {index === 0 ? (
              <img
                src='/static/icons/crown.svg'
                alt='Crown'
                className='h-[24px] w-[24px] object-contain'
              />
            ) : (
              <div className='flex h-[24px] w-[24px] items-center justify-center rounded-[2px] border border-solid border-[var(--primary-5)]'>
                <Text type='body-10-regular' color='primary-5'>
                  {index + 1}
                </Text>
              </div>
            )}

            <Text type='body-12-regular' className='ml-[8px] text-[#0D0D0D]'>
              {item}
            </Text>

            <div className='ml-auto px-[6px]'>
              <img
                src='/static/icons/iconBlackRight.svg'
                alt='Icon right'
                className='h-[6px] w-[4px] object-contain'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockDetail;
