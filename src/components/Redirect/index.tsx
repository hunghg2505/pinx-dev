import React from 'react';

import { useCountDown } from 'ahooks';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';

const Redirect = () => {
  const { t } = useTranslation(['redirect', 'common']);
  const [targetDate, setTargetDate] = React.useState<number>();
  const router = useRouter();
  const url = router?.query?.url;
  const onContinute = () => {
    url && window.open(`${url}`, '_self');
  };
  React.useEffect(() => {
    setTargetDate(Date.now() + 5000);
  }, []);
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      url && window.open(`${url}`, '_self');
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <div className='header relative mb-[37px] border-b border-solid border-[#D8EBFC] tablet:hidden desktop:hidden'>
        <Text type='body-16-bold' color='primary-5' className='py-[16px] text-center '>
          {t('redirect')}
        </Text>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          width={32}
          height={32}
          className='absolute left-[16px] top-2/4 h-[28px] w-[28px] -translate-y-1/2 transform cursor-pointer'
          onClick={handleGoBack}
        />
      </div>

      <div className='flex flex-col items-center mobile:px-[30px] tablet:mt-[32px]'>
        <img
          src='/static/images/redirect.png'
          alt=''
          width={0}
          height={0}
          sizes='100vw'
          className='object-contain mobile:h-[200px] mobile:w-[168px] tablet:h-[250px] tablet:w-[220px]'
        />
        <Text
          type='body-16-semibold'
          color='neutral-2'
          className='mt-[30px] tablet:mt-[36px] tablet:!text-[24px] tablet:!font-bold'
        >
          {t('title')} {Math.round(countdown / 1000)}s...
        </Text>
        <div className='flex mobile:mt-[16px] tablet:mt-[25px]'>
          <img
            src='/static/icons/iconWarning.svg'
            alt=''
            width={20}
            height={20}
            className='mr-[10px] h-[20px] w-[20px] object-contain'
          />
          <Text
            type='body-14-regular'
            color='neutral-4'
            className='text-center galaxy-max:text-left galaxy-max:text-[12px]'
          >
            {t('description.first_line')}
          </Text>
        </div>
        <Text
          type='body-14-regular'
          color='neutral-4'
          className='text-center mobile:mt-[16px] galaxy-max:text-[12px] tablet:mt-[25px]'
        >
          {t('description.second_line')}
        </Text>
        <div className='flex  mobile:mt-[16px] tablet:mt-[24px] '>
          <div className='mr-[4px] flex items-center rounded-bl-[8px] rounded-br-none rounded-tl-[8px] rounded-tr-none border-[1px] border-solid border-[#CCC] bg-[#FFF] px-[12px] mobile:py-[9px]   galaxy-max:py-[6px] tablet:py-[16px]'>
            <img
              src='/static/icons/iconLink-02.svg'
              alt=''
              width={0}
              height={0}
              className='mr-[4px] w-[20px] galaxy-max:w-[16px]'
            />
            <Text
              type='body-14-regular'
              color='primary-4'
              className='inline-block overflow-hidden overflow-ellipsis whitespace-nowrap mobile:max-w-[189px] galaxy-max:max-w-[120px] galaxy-max:text-[12px] tablet:max-w-[393px] tablet:!text-[16px]'
            >
              {url}
            </Text>
          </div>
          <div
            className='cursor-pointer rounded-bl-none rounded-br-[8px] rounded-tl-none rounded-tr-[8px] bg-[#1F6EAC] px-[24px] mobile:py-[9px]  galaxy-max:basis-1/2  galaxy-max:px-[8px] galaxy-max:py-[8px] tablet:py-[17px]'
            onClick={onContinute}
          >
            <Text
              type='body-14-semibold'
              color='neutral-9'
              className='galaxy-max:text-[12px] tablet:!text-[16px]'
            >
              {t('common:continue2')}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};
export default Redirect;
