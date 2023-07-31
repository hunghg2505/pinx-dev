import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

import AlsoOwnItem from '../AlsoOwnItem';
import { useCompanyTaggingInfo } from '../service';

const AlsoOwn = () => {
  const { t } = useTranslation(['stock', 'common']);
  const router = useRouter();
  const { stockCode }: any = router.query;
  const { taggingInfo } = useCompanyTaggingInfo(stockCode);

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>{t('also_own')}</title>
      </Head>

      <div className='rounded-[8px] bg-white pb-[20px] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
        <div className='relative flex h-[46px] items-center justify-end pr-[16px] tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9] tablet:pr-[24px]'>
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

          <Text type='body-14-semibold' className='text-[#0D0D0D]'>
            {t('total')}: {taggingInfo?.data?.subsidiaries.length}
          </Text>
        </div>

        <div className='px-[16px] tablet:px-[24px]'>
          <div className='mb-[32px] mt-[20px] flex flex-col gap-y-[12px]'>
            {taggingInfo?.data?.subsidiaries.map((item, index) => (
              <AlsoOwnItem key={index} data={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AlsoOwn;
