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
    <div className='rounded-[8px] bg-[#FFF] px-[24px] py-[20px] tablet-max:px-[0]'>
      <div className='relative text-center'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute left-0 top-0 w-[28px] cursor-pointer'
          onClick={onGoBack}
        />
        <Text type='body-20-bold' color='neutral-1'>
          {t('themes')}
        </Text>
      </div>
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9] tablet:w-[calc(100%+48px)] tablet:-translate-x-[24px]'></div>
      <div className='grid grid-cols-4 gap-x-[36px] gap-y-[28px] mobile-max:!grid-cols-2 mobile-max:gap-x-[23px]'>
        {theme?.map((theme: ITheme, index: number) => {
          return (
            <div key={index}>
              <div className=' mr-[23px] w-[149px] mobile-max:mr-[0px] mobile-max:w-full'>
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
