import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { CompanyRelatedType, ITaggingInfo } from '@components/Stock/type';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import { AnalyzeTicker } from '@utils/dataLayer';

interface IMainBusinessProps {
  taggingInfo?: {
    data?: ITaggingInfo;
  };
  stockCode: string;
}

const MainBusiness = ({ taggingInfo, stockCode }: IMainBusinessProps) => {
  const { t } = useTranslation(['stock', 'common']);
  const router = useRouter();

  const goToListCompanyPage = (type: CompanyRelatedType, hashtagId: string) => {
    // gtm
    AnalyzeTicker(stockCode, 'Stock related', 'General');

    router.push({
      pathname: ROUTE_PATH.STOCK_RELATED(stockCode, hashtagId),
      query: {
        type,
      },
    });
  };

  if (!taggingInfo?.data?.industries || !taggingInfo?.data?.industries.length) {
    return <></>;
  }

  return (
    <div className='box-shadow card-style'>
      <div className='mb-[4px]'>
        <Text type='body-20-semibold'>{t('main_business')}</Text>
      </div>

      {taggingInfo?.data?.industries.map((item, index) => (
        <div
          className='flex cursor-pointer items-center border-solid border-[var(--neutral-7)] py-[12px] [&:not(:last-child)]:border-b'
          key={index}
          onClick={() => goToListCompanyPage(CompanyRelatedType.INDUSTRY, item.id)}
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

          <Text type='body-14-regular' className='ml-[8px] text-[#0D0D0D]'>
            {item.tagName}
          </Text>

          <div className='ml-auto px-[6px]'>
            <img
              src='/static/icons/iconBlackRight.svg'
              alt='Icon right'
              className='h-[12px] w-[8px] object-contain'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainBusiness;
