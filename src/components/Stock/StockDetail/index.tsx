import React, { useState } from 'react';

import classNames from 'classnames';
import Link from 'next/link';
import Tabs, { TabPane } from 'rc-tabs';
import Slider from 'react-slick';

import Text from '@components/UI/Text';

import CalendarItem from './CalendarItem';
import { DESCRIPTION, LIST_BUSINESS, SLIDER } from './const';
import FinancialAnnualTab from './FinancialAnnualTab';
import FinancialQuartersTab from './FinancialQuartersTab';
import IntradayTab from './IntradayTab';
import MatchingsTab from './MatchingsTab';
import MovementsTab from './MovementsTab';
import NewsItem from './NewsItem';
import ReviewItem from './ReviewItem';
import StockItem from './StockItem';
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
          <Text type='body-12-regular' className='primary-5 mr-[4px]'>
            46,086+
          </Text>

          <div className='flex items-center'>
            <img
              src='https://picsum.photos/200/100'
              alt='Subscriber user'
              className='block h-[28px] w-[28px] rounded-full border border-solid border-[#EEF5F9] object-cover [&:not(:first-child)]:-ml-[8px]'
            />
            <img
              src='https://picsum.photos/200/100'
              alt='Subscriber user'
              className='block h-[28px] w-[28px] rounded-full border border-solid border-[#EEF5F9] object-cover [&:not(:first-child)]:-ml-[8px]'
            />
            <img
              src='https://picsum.photos/200/100'
              alt='Subscriber user'
              className='z-10 block h-[28px] w-[28px] rounded-full border border-solid border-[#EEF5F9] object-cover [&:not(:first-child)]:-ml-[8px]'
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

      {/* revenue */}
      <div className='mt-[28px] px-[16px]'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          Revenue Sources
        </Text>

        {/* chart */}
        <div></div>

        <div className='mt-[8px]'>
          <div className='flex items-center border-b border-solid border-[var(--neutral-7)] py-[16px]'>
            <div className='h-[20px] w-[20px] rounded-full bg-[#08AADD]'></div>
            <Text type='body-14-semibold' className='ml-[10px] text-[#0D0D0D]'>
              Selling
            </Text>

            <Text type='body-14-semibold' className='ml-auto'>
              92.7%
            </Text>
          </div>

          <div className='flex items-center border-b border-solid border-[var(--neutral-7)] py-[16px]'>
            <div className='h-[20px] w-[20px] rounded-full bg-[#F4BDBD]'></div>
            <Text type='body-14-semibold' className='ml-[10px] text-[#0D0D0D]'>
              Other
            </Text>

            <Text type='body-14-semibold' className='ml-auto'>
              7.3%
            </Text>
          </div>
        </div>
      </div>

      {/* highlights */}
      <div className='mt-[28px] px-[16px]'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          Highlights
        </Text>

        <div className='flex flex-wrap gap-[12px]'>
          <div className='flex h-[30px] items-center justify-center rounded-full border border-solid border-[#B1D5F1] px-[10px]'>
            <Text type='body-14-medium' color='primary-2'>
              #Asia
            </Text>
          </div>

          <div className='flex h-[30px] items-center justify-center rounded-full border border-solid border-[#B1D5F1] px-[10px]'>
            <Text type='body-14-medium' color='primary-2'>
              #Greenenvironment
            </Text>
          </div>

          <div className='flex h-[30px] items-center justify-center rounded-full border border-solid border-[#B1D5F1] px-[10px]'>
            <Text type='body-14-medium' color='primary-2'>
              #Internationalquality
            </Text>
          </div>

          <div className='flex h-[30px] items-center justify-center rounded-full border border-solid border-[#B1D5F1] px-[10px]'>
            <Text type='body-14-medium' color='primary-2'>
              #USA
            </Text>
          </div>

          <div className='flex h-[30px] items-center justify-center rounded-full border border-solid border-[#B1D5F1] px-[10px]'>
            <Text type='body-14-medium' color='primary-2'>
              #Scholarship
            </Text>
          </div>

          <div className='flex h-[30px] items-center justify-center rounded-full border border-solid border-[#B1D5F1] px-[10px]'>
            <Text type='body-14-medium' color='primary-2'>
              #Socialfund
            </Text>
          </div>
        </div>
      </div>

      {/* also own */}
      <div className='my-[28px] border-t border-solid border-[var(--neutral-7)] pt-[28px]'>
        <div className='px-[16px]'>
          <Text type='body-20-semibold' className='mb-[8px]'>
            Also Own
          </Text>

          <StockItem />

          <Link href='/'>
            <button className='mt-[8px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'>
              <Text type='body-14-bold' color='primary-2'>
                See more
              </Text>
            </button>
          </Link>
        </div>
      </div>

      {/* rating */}
      <div className='border-t-[8px] border-solid border-[#F7F6F8] pt-[28px]'>
        <div className='px-[16px]'>
          <Text type='body-20-semibold' className='mb-[16px]'>
            Rating
          </Text>
          <Text type='body-14-regular' className='mb-[12px]'>
            How do you like this stock? Let’s spread to the world of investors
          </Text>

          <div className='mb-[28px] mt-[12px] flex gap-x-[52px]'>
            <div>
              <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                Avg. score
              </Text>
              <Text type='body-20-medium' color='semantic-2-1'>
                4.41
              </Text>
            </div>

            <div>
              <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                Votes
              </Text>
              <Text type='body-20-medium' className='text-[#0D0D0D]'>
                39
              </Text>
            </div>

            <div>
              <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                Reviews
              </Text>

              <div className='flex items-center'>
                <Text type='body-20-medium' color='primary-1'>
                  14
                </Text>

                <img
                  src='/static/icons/iconPrimaryRight.svg'
                  alt='Icon primary right'
                  className='ml-[10px] h-[8px] w-[4px] object-contain'
                />
              </div>
            </div>
          </div>

          <ReviewItem />

          <button className='mt-[20px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'>
            <Text type='body-14-bold' color='primary-2'>
              See more review
            </Text>
          </button>
        </div>
      </div>

      {/* community */}
      <div className='mt-[28px] px-[16px]'>
        <Text type='body-20-semibold'>Community</Text>
        <Text type='body-14-regular' className='mt-[16px]'>
          Who is subcribed or investing in this company
        </Text>

        <div className='mt-[16px] flex items-center justify-between'>
          <div className='flex gap-x-[10px]'>
            <div className='relative'>
              <img
                src='https://picsum.photos/100/200'
                alt='Avatar'
                className='h-[40px] w-[40px] rounded-full border border-solid border-[#EEF5F9] object-cover'
              />

              <img
                src='/static/icons/iconTree.svg'
                alt='Icon tree'
                className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain'
              />
            </div>

            <div className='relative'>
              <img
                src='https://picsum.photos/100/200'
                alt='Avatar'
                className='h-[40px] w-[40px] rounded-full border border-solid border-[#EEF5F9] object-cover'
              />

              <img
                src='/static/icons/iconHeartActive.svg'
                alt='Icon tree'
                className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain'
              />
            </div>

            <div className='relative'>
              <img
                src='https://picsum.photos/100/200'
                alt='Avatar'
                className='h-[40px] w-[40px] rounded-full border border-solid border-[#EEF5F9] object-cover'
              />

              <img
                src='/static/icons/iconTree.svg'
                alt='Icon tree'
                className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain'
              />
            </div>

            <div className='relative'>
              <img
                src='https://picsum.photos/100/200'
                alt='Avatar'
                className='h-[40px] w-[40px] rounded-full border border-solid border-[#EEF5F9] object-cover'
              />

              <img
                src='/static/icons/iconHeartActive.svg'
                alt='Icon tree'
                className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain'
              />
            </div>

            <div className='relative'>
              <img
                src='https://picsum.photos/100/200'
                alt='Avatar'
                className='h-[40px] w-[40px] rounded-full border border-solid border-[#EEF5F9] object-cover'
              />

              <img
                src='/static/icons/iconTree.svg'
                alt='Icon tree'
                className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain'
              />
            </div>
          </div>

          <div className='flex h-[34px] min-w-[90px] items-center justify-center rounded-full bg-[#F7F6F8] px-[16px]'>
            <Text type='body-14-regular' className='text-[#0D0D0D]'>
              46086
            </Text>
            <img
              src='/static/icons/iconBlackRight.svg'
              alt='Icon right'
              className='ml-[10px] h-[8px] w-[4px]'
            />
          </div>
        </div>
      </div>

      {/* recent news */}
      <div className='mt-[28px]'>
        <div className='mb-[4px] px-[16px]'>
          <Text type='body-20-semibold'>Recent news</Text>
        </div>

        <NewsItem />
        <NewsItem />
        <NewsItem />

        <div className='px-[16px]'>
          <button className='mt-[12px] h-[46px] w-full rounded-[8px] bg-[#EEF5F9]'>
            <Text type='body-14-bold' color='primary-2'>
              More HPG news
            </Text>
          </button>
        </div>
      </div>

      {/* themes */}
      <div className='mt-[28px] px-[16px]'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          Featured in themes
        </Text>
      </div>

      {/* calendar */}
      <div className='mt-[28px] px-[16px]'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          Financial calendar
        </Text>

        <Text type='body-14-regular' className='mb-[12px]'>
          Most recent & upcoming events
        </Text>

        <div className='flex flex-col gap-y-[12px]'>
          <CalendarItem />
          <CalendarItem />
          <CalendarItem />
        </div>

        <button className='mt-[16px] h-[46px] w-full rounded-[8px] bg-[#EEF5F9]'>
          <Text type='body-14-bold' color='primary-2'>
            More HPG events
          </Text>
        </button>
      </div>

      {/* financial */}
      <div className='mt-[28px] px-[16px]'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          Financial indicator
        </Text>

        <Tabs className={styles.financialTab} defaultActiveKey='1'>
          <TabPane tab='Quarters' tabKey='1'>
            <FinancialQuartersTab />
          </TabPane>

          <TabPane tab='Annual' key='2'>
            <FinancialAnnualTab />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default StockDetail;
