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
    <div className='box-shadow card-style mb-10 rounded-[8px] bg-[#FFF] p-[10px] tablet:mt-[24px] tablet:p-[16px] desktop:mt-0'>
      <div className='relative mb-[16px] mt-[12px] h-[40px] text-center tablet:mt-0'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute left-0 top-1/2 w-[28px] -translate-y-1/2 cursor-pointer'
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

      <div className='grid grid-cols-2 gap-[16px] galaxy-max:grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4'>
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
