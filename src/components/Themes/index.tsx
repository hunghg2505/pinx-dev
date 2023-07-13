import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { ITheme, useGetTheme } from '@components/Home/service';
import Text from '@components/UI/Text';

const ThemeExploreItem = dynamic(() => import('./ThemeExploreItem'));

const Themes = () => {
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  const { theme } = useGetTheme();
  return (
    <div className='rounded-[8px] bg-[#FFF] px-[24px] py-[20px] '>
      <div className='relative text-center'>
        <img
          src='/static/icons/back_icon.svg'
          alt=''
          className='absolute left-0 top-0 w-[28px] cursor-pointer'
          onClick={onGoBack}
        />
        <Text type='body-24-semibold' color='neutral-1' className=''>
          Themes
        </Text>
      </div>
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <div className='grid grid-cols-4 gap-x-[36px] gap-y-[28px] mobile-max:gap-x-[23px]'>
        {theme?.map((theme: ITheme, index: number) => {
          return (
            <div key={index}>
              <div className=' mr-[23px] w-[149px] mobile-max:mr-[16px]'>
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
