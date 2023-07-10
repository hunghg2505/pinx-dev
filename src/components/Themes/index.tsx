import { useRouter } from 'next/router';

import Text from '@components/UI/Text';

import ThemeExploreItem from './ThemeExploreItem';

const Themes = () => {
  const router = useRouter();
  const onGoBack = () => {
    router.back();
  };
  return (
    <>
      <img
        src='/static/icons/back_icon.svg'
        alt=''
        className='mb-[16px] w-[28px] cursor-pointer'
        onClick={onGoBack}
      />
      <Text type='body-24-semibold' color='neutral-1' className='mb-[24px]'>
        Themes
      </Text>
      <div className='grid grid-cols-2 gap-x-[23px] gap-y-[28px]'>
        <ThemeExploreItem />
        <ThemeExploreItem />
        <ThemeExploreItem />
        <ThemeExploreItem />
      </div>
    </>
  );
};
export default Themes;
