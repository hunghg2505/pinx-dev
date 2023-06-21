import Image from 'next/image';

import { ITheme } from '@components/Home/service';
import Text from '@components/UI/Text';

interface IProps {
  theme: ITheme;
}
const IconPlus = () => (
  <svg width='7' height='7' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5.00501 10C5.49649 10 5.81745 9.6432 5.81745 9.17068V5.78592H9.13741C9.62889 5.78592 10 5.47734 10 5.00482C10 4.5323 9.62889 4.22372 9.13741 4.22372H5.81745V0.829315C5.81745 0.356798 5.49649 0 5.00501 0C4.51354 0 4.19258 0.356798 4.19258 0.829315V4.22372H0.862588C0.371113 4.22372 0 4.5323 0 5.00482C0 5.47734 0.371113 5.78592 0.862588 5.78592H4.19258V9.17068C4.19258 9.6432 4.51354 10 5.00501 10Z'
      fill='#1F6EAC'
    />
  </svg>
);

const ThemesItem = (props: IProps) => {
  const { theme } = props;
  return (
    <div className='w-[162px] pr-[10px]'>
      <div className='relative min-h-[172px] w-full rounded-[10px]  bg-[#B5D2D3] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
        <Image
          src={theme?.url}
          alt=''
          width='0'
          height='0'
          sizes='100vw'
          className='absolute right-[0] top-[0] h-full w-full rounded-[10px]'
        />
        <div className='absolute bottom-[10px] left-2/4 w-[calc(100%_-_30px)] -translate-x-1/2 transform rounded-[10px] bg-[rgba(255,_255,_255,_0.8)] backdrop-blur-[2px] backdrop-filter'>
          <div className='flex h-[56px] flex-col items-center justify-center px-[8px]'>
            <Text type='body-12-bold' color='primary-5' className='text-center'>
              {theme?.name}
            </Text>
            <Text type='body-12-bold' color='neutral-4' className='mb-[6px] text-center'>
              2K Subcribers
            </Text>
          </div>
          <button className='flex h-[32px] w-full flex-row items-center justify-center [border-top:1px_solid_#B1D5F1] '>
            <IconPlus />
            <Text type='body-12-bold' color='primary-2' className='ml-[5px]'>
              Subcribe
            </Text>
          </button>
        </div>
      </div>
    </div>
  );
};
export default ThemesItem;
