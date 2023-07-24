import React from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';

import { IWatchListItem } from '@components/Home/service';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';

import styles from './index.module.scss';
import InterestItem from './InterestItem';

interface IProps {
  isEdit?: boolean;
  interestStock?: any;
  refreshInterest?: () => void;
  refreshYourWatchList?: () => void;
}
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};
const Interest = (props: IProps) => {
  const { isEdit = false, interestStock, refreshInterest } = props;
  const { t } = useTranslation('watchlist');
  const { isDesktop, isMobile } = useResponsive();
  return (
    <>
      {!isEdit && (
        <div className='flex flex-col gap-y-[16px]'>
          <Text type='body-20-bold' className='text-[#0D0D0D]'>
            {t('titleInterest')}
          </Text>
          {isMobile && (
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
                  <InterestItem data={item} refresh={refreshInterest} />
                </div>
              ))}
            </div>
          )}
          {isDesktop && (
            <div className='max-w-[680px] '>
              <Slider
                {...settings}
                className={classNames('flex gap-x-[16px]', styles.slickSlider)}
                draggable
              >
                {interestStock?.map((item: IWatchListItem, index: number) => (
                  <div
                    key={index}
                    className='relative min-h-[172px] flex-none rounded-[12px] bg-[#f9f9f9] px-[14px] pb-[12px] pt-[16px]'
                  >
                    <InterestItem data={item} refresh={refreshInterest} />
                  </div>
                ))}
              </Slider>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default Interest;
