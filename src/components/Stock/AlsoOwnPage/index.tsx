import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { formatStringToNumber } from '@utils/common';

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

      <div className='p-[10px] desktop:p-0'>
        <div className='box-shadow card-style'>
          <div className='relative mb-[12px] flex h-[44px] items-center justify-end tablet:mb-0 tablet:h-[48px]'>
            <div className='absolute left-0 top-1/2 flex -translate-y-1/2 items-center justify-between'>
              <div className='cursor-pointer items-center pr-[16px]' onClick={handleBack}>
                <img
                  src='/static/icons/back_icon.svg'
                  alt=''
                  className='h-[28px] w-[28px] object-contain'
                />
              </div>
            </div>

            <Text type='body-14-semibold' className='text-[#0D0D0D]'>
              {t('total')}: {formatStringToNumber(taggingInfo?.data?.subsidiaries.length) || 0}
            </Text>
          </div>

          <div className='flex flex-col gap-y-[12px]'>
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
