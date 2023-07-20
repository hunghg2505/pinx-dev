import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { ITheme } from '@components/Home/service';
import Text from '@components/UI/Text';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH } from '@utils/common';

interface IProps {
  theme: ITheme;
  isLogin: boolean;
  refresh: () => void;
}
const IconPlus = () => (
  <svg width='7' height='7' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5.00501 10C5.49649 10 5.81745 9.6432 5.81745 9.17068V5.78592H9.13741C9.62889 5.78592 10 5.47734 10 5.00482C10 4.5323 9.62889 4.22372 9.13741 4.22372H5.81745V0.829315C5.81745 0.356798 5.49649 0 5.00501 0C4.51354 0 4.19258 0.356798 4.19258 0.829315V4.22372H0.862588C0.371113 4.22372 0 4.5323 0 5.00482C0 5.47734 0.371113 5.78592 0.862588 5.78592H4.19258V9.17068C4.19258 9.6432 4.51354 10 5.00501 10Z'
      fill='#1F6EAC'
    />
  </svg>
);
const IconChecked = () => (
  <svg width='13' height='12' viewBox='0 0 13 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_d_492_24620)'>
      <path
        d='M10.5 3L5 8.5L2.5 6'
        stroke='#1F6EAC'
        strokeWidth='2'
        strokeLinecap='square'
        shapeRendering='crispEdges'
      />
    </g>
    <defs>
      <filter
        id='filter0_d_492_24620'
        x='-0.514063'
        y='0.785937'
        width='14.0281'
        height='11.5281'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix
          in='SourceAlpha'
          type='matrix'
          values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
          result='hardAlpha'
        />
        <feOffset dy='0.8' />
        <feGaussianBlur stdDeviation='0.8' />
        <feComposite in2='hardAlpha' operator='out' />
        <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.24 0' />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_492_24620' />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_dropShadow_492_24620'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
);

const ThemesItem = (props: IProps) => {
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const { theme, isLogin, refresh } = props;
  const router = useRouter();
  const useSubcribe = useRequest(
    (code: string) => {
      return privateRequest(
        requestPist.post,
        API_PATH.PRIVATE_FOLLOW_THEME + `?themeCodes=${code}`,
      );
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
      },
      onError: () => {},
    },
  );
  const useUnSubcribe = useRequest(
    (code: string) => {
      return privateRequest(
        requestPist.put,
        API_PATH.PRIVATE_UNFOLLOW_THEME + `?themeCodes=${code}`,
      );
    },
    {
      manual: true,
      onSuccess: () => {
        refresh();
      },
      onError: () => {},
    },
  );
  const onSubcribe = () => {
    if (isLogin) {
      if (theme?.isSubsribed) {
        useUnSubcribe.run(theme.code);
      } else {
        useSubcribe.run(theme.code);
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };
  const renderSubcribe = () => {
    if (theme?.isSubsribed) {
      return (
        <>
          <IconChecked />
          <Text type='body-12-bold' color='primary-2' className='ml-[5px]'>
            Subscribed
          </Text>
        </>
      );
    }
    return (
      <>
        <IconPlus />
        <Text type='body-12-bold' color='primary-2' className='ml-[5px]'>
          Subcribe
        </Text>
      </>
    );
  };
  return (
    <>
      <div className='w-[162px] pr-[10px]'>
        <div className='relative min-h-[191px] w-full rounded-[10px]  bg-[#B5D2D3] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
          {theme?.url && (
            <img
              src={theme?.url}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='absolute right-[0] top-[0] h-full w-full cursor-pointer rounded-[10px]'
              onClick={() => router.push(ROUTE_PATH.THEME_DETAIL(theme?.code))}
            />
          )}
          <div className='absolute bottom-[10px] left-2/4 w-[calc(100%_-_30px)] -translate-x-1/2 transform rounded-[10px] bg-[rgba(255,_255,_255,_0.8)] backdrop-blur-[2px] backdrop-filter'>
            <div className='flex h-[65px] flex-col items-center justify-center px-[8px]'>
              <Text type='body-12-bold' color='primary-5' className='text-center'>
                {theme?.name}
              </Text>
              {theme.totalSubscribe !== 0 && isLogin && (
                <Text type='body-12-bold' color='neutral-4' className='mb-[6px] text-center'>
                  {theme.totalSubscribe} Subcribers
                </Text>
              )}
            </div>
            <button
              className='flex h-[32px] w-full flex-row items-center justify-center [border-top:1px_solid_#B1D5F1]'
              onClick={onSubcribe}
            >
              {renderSubcribe()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ThemesItem;
