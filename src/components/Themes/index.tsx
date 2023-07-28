import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { ITheme, useGetTheme } from '@components/Home/service';
import Text from '@components/UI/Text';

const ThemeExploreItem = dynamic(() => import('./ThemeExploreItem'));

const Themes = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  const { theme } = useGetTheme();
  return (
    <div className='mb-10 rounded-[8px] bg-[#FFF] px-[10px] py-[20px] tablet:px-[0]'>
      <div className='relative h-[25px] text-center'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute left-0 top-1/2 w-[28px] -translate-y-1/2 cursor-pointer tablet:left-[16px]'
          onClick={onGoBack}
        />
        <Text
          type='body-20-bold'
          color='neutral-1'
          className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        >
          {t('themes')}
        </Text>
      </div>

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9] tablet:w-[calc(100%+48px)] tablet:-translate-x-[24px]'></div>

      <div className='grid grid-cols-2 gap-[16px] px-[0] tablet:grid-cols-3 tablet:px-[16px] desktop:grid-cols-4 '>
        {theme?.map((theme: ITheme, index: number) => {
          return (
            <div key={index}>
              <div className='mobile-max:mr-[0px] mobile-max:w-full'>
                <ThemeExploreItem data={theme} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Themes;
