import classNames from 'classnames';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { IMAGE_COMPANY_URL } from '@utils/constant';

export const ActivityOrder = ({ postDetail }: any) => {
  const { t } = useTranslation();
  const stockCode = postDetail.post?.stockCode;

  const urlStock = `${IMAGE_COMPANY_URL}${
    stockCode?.length === 3 || stockCode?.[0] !== 'C' ? stockCode : stockCode?.slice(1, 4)
  }.png`;
  const pnlRate = postDetail?.post?.pnlRate;
  return (
    <div className='relative w-full rounded-[10px] mobile:h-[204px] desktop:h-[309px]'>
      <img
        src={postDetail?.post?.bgImage || '/static/images/postSellStock.png'}
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='absolute right-0 top-0 h-full w-full rounded-[10px] object-cover'
      />
      <div className='absolute rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:bottom-[10px] mobile:left-[20px] mobile:h-[168px] mobile:w-[120px] desktop:bottom-[11px] desktop:left-[32px] desktop:h-[269px] desktop:w-[192px]'>
        <img
          src={urlStock || '/static/icons/logoStock.svg'}
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='absolute -top-[14px] left-2/4 mr-[6px] h-[36px] w-[36px] -translate-x-1/2 transform rounded-full object-contain desktop:-top-[24px] desktop:h-[48px] desktop:w-[48px]'
        />
        <div className='mt-[25px] flex flex-col items-center justify-center desktop:mt-[36px]'>
          <Text
            type='body-16-bold'
            color='neutral-1'
            className='desktop:!text-[24px] desktop:!leading-[32px]'
          >
            {postDetail?.post?.stockCode}
          </Text>
          <div className='flex h-[24px] w-[24px] flex-col items-center justify-center rounded-[10000px] bg-[#FFFFFF] desktop:my-[7px] desktop:h-[32px] desktop:w-[32px]'>
            <img
              src='/static/icons/iconPostBuy.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='w-[12px] desktop:w-[20px]'
            />
          </div>
          <Text
            type='body-12-medium'
            color='neutral-1'
            className={classNames(
              'mb-[4px] mt-[4px] desktop:!text-[20px] desktop:!leading-[28px]',
              { 'mt-[24px]': postDetail?.post?.type === 'BUY' },
            )}
          >
            {postDetail?.post?.type === 'BUY' ? t('bought') : t('sell')}
          </Text>
          {postDetail?.post?.type === 'SELL' && (
            <Text
              type='body-16-medium'
              className={classNames('desktop:!text-[24px] desktop:!leading-[32px]', {
                'text-[#128F63]': pnlRate > 0,
                'text-[#DB4444]': pnlRate < 0,
              })}
            >
              {pnlRate?.toFixed(2)}%
            </Text>
          )}

          <Text
            type='body-12-medium'
            color='neutral-3'
            className='mb-[2px] mt-[10px] desktop:mt-[24px] desktop:!text-[20px] desktop:!leading-[28px]'
          >
            {t('made_on_pinex')}
          </Text>
          <Text
            type='body-12-medium'
            color='neutral-3'
            className='desktop:!text-[20px] desktop:!leading-[28px]'
          >
            {dayjs(postDetail?.post?.tradingDate).format('DD/MM/YYYY')}
          </Text>
        </div>
      </div>
    </div>
  );
};
