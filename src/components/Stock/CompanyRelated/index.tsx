import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import { useCompaniesRelated, useCompanyTaggingInfo } from '../service';
import StockItem from '../StockDetail/StockItem';
import { CompanyRelatedType } from '../type';

const DESC_LINE_HEIGHT = 21;
const DESC_MAX_LINE = 1;
const DESC_MAX_HEIGHT = DESC_LINE_HEIGHT * DESC_MAX_LINE;

const CompanyRelated = () => {
  const { t } = useTranslation(['stock', 'common']);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const descRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const { stockCode, type, hashtagId }: any = router.query;

  const { taggingInfo } = useCompanyTaggingInfo(stockCode);

  let hashtagInfo;
  if (type === CompanyRelatedType.INDUSTRY) {
    hashtagInfo = taggingInfo?.data?.industries.find((item) => item.id === hashtagId);
  }

  if (type === CompanyRelatedType.HIGHLIGHTS) {
    hashtagInfo = taggingInfo?.data?.highlights.find((item) => item.id === hashtagId);
  }
  const { companiesRelated } = useCompaniesRelated(hashtagId, type, {
    pageSize: 9999,
  });

  useEffect(() => {
    const introDescHeight = descRef.current?.clientHeight || 0;
    introDescHeight && setShowSeeMore(introDescHeight > DESC_MAX_HEIGHT);
  }, [hashtagInfo]);

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{t('company_related_title')}</title>
      </Head>

      <div className='rounded-[8px] bg-white pb-[20px] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
        <div className='relative flex h-[46px] items-center justify-center tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9]'>
          <div className='absolute left-[16px] top-1/2 flex -translate-y-1/2 items-center justify-between tablet:left-[24px]'>
            <div
              className='cursor-pointer items-center py-[12px] pl-[8px] pr-[16px]'
              onClick={handleBack}
            >
              <img
                src='/static/icons/back_icon.svg'
                alt=''
                className='h-[28px] w-[28px] object-contain'
              />
            </div>
          </div>

          <Text type='body-20-bold' color='primary-5' className='hidden tablet:block'>
            {t('company_related_title')}
          </Text>
        </div>

        <div className='px-[16px] tablet:mt-[20px] tablet:px-[24px]'>
          <div className='flex items-center'>
            <div className='flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-[#5F6178]'>
              <img
                src='/static/icons/iconBusiness.svg'
                alt='Icon'
                className='h-[13px] w-[21px] object-contain'
              />
            </div>

            <div className='ml-[12px] flex-1 overflow-hidden'>
              <Text type='body-14-semibold' className='text-[#0D0D0D]'>
                {hashtagInfo?.tagName}
              </Text>

              <div
                style={{ lineHeight: `${DESC_LINE_HEIGHT}px`, maxHeight: `${DESC_MAX_HEIGHT}px` }}
                className={classNames('mt-[4px] overflow-hidden', {
                  '!max-h-max': isSeeMore,
                })}
              >
                <div ref={descRef} className='leading-[inherit]'>
                  <Text type='body-14-regular' className='leading-[inherit] text-[#0D0D0D]'>
                    {hashtagInfo?.description}
                  </Text>
                </div>
              </div>

              {showSeeMore && (
                <Text
                  onClick={() => setIsSeeMore((prev) => !prev)}
                  type='body-14-semibold'
                  color='primary-2'
                  className='mt-[12px] inline-block cursor-pointer'
                >
                  {isSeeMore ? t('common:see_less') : t('common:see_more') + '...'}
                </Text>
              )}
            </div>
          </div>

          <div className='mb-[32px] mt-[52px] flex items-center justify-between border-b border-solid border-b-[#EBEBEB] pb-[16px]'>
            <Text type='body-14-semibold' className='text-[#0D0D0D]'>
              {t('company_related_total')}: {companiesRelated?.data.totalElements}
            </Text>

            <Text type='body-14-regular' color='primary-5'>
              {t('company_related_by_market_cap')}
            </Text>
          </div>

          <div className='mb-[32px] flex flex-col gap-y-[20px]'>
            {companiesRelated?.data.list.map((item, index) => (
              <StockItem data={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyRelated;
