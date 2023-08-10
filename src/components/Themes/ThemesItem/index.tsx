import React from 'react';

import { useRequest } from 'ahooks';
import { useAtom } from 'jotai';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { API_PATH } from '@api/constant';
import { privateRequest, requestPist } from '@api/request';
import { ITheme } from '@components/Home/service';
import Notification from '@components/UI/Notification';
import NotificationSubsribeTheme from '@components/UI/Notification/NotificationSubsribeTheme';
import Text from '@components/UI/Text';
import { useUserType } from '@hooks/useUserType';
import { getAccessToken } from '@store/auth';
import { popupStatusAtom } from '@store/popup/popup';
import { popupThemeDataAtom } from '@store/theme';
import { ROUTE_PATH } from '@utils/common';
import { USERTYPE } from '@utils/constant';

interface IProps {
  theme: ITheme;
  isLogin?: boolean;
  refresh?: () => void;
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
  const { t } = useTranslation(['theme', 'common']);
  const [, setPopupThemeData] = useAtom(popupThemeDataAtom);
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const isLogin = !!getAccessToken();
  const { statusUser } = useUserType();
  const { theme, refresh } = props;
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
        if (![USERTYPE.NEW, USERTYPE.PENDING_TO_CLOSE].includes(statusUser)) {
          toast((t) => <NotificationSubsribeTheme theme={theme} toastId={t.id} />, {
            duration: 5000,
            style: {
              maxWidth: '90vw',
            },
          });
          setPopupThemeData(theme);
        }
        refresh && refresh();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
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
        if (![USERTYPE.NEW, USERTYPE.PENDING_TO_CLOSE].includes(statusUser)) {
          toast(() => <NotificationSubsribeTheme isUnsubscribe theme={theme} />, {
            duration: 5000,
            style: {
              maxWidth: '90vw',
            },
          });
          setPopupThemeData(theme);
        }
        refresh && refresh();
      },
      onError: (e: any) => {
        toast(() => <Notification type='error' message={e?.error} />);
      },
    },
  );
  const onSubcribe = (e: any) => {
    e.preventDefault();

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
            {t('theme:subscribed')}
          </Text>
        </>
      );
    }
    return (
      <>
        <IconPlus />
        <Text type='body-12-bold' color='primary-2' className='ml-[5px]'>
          {t('theme:subscribe')}
        </Text>
      </>
    );
  };
  return (
    <>
      <div className='mx-auto w-[177px] pr-[16px]'>
        <div className='relative min-h-[252px] w-full rounded-[10px]  bg-[#B5D2D3] [box-shadow:0px_4px_24px_rgba(88,_102,_126,_0.08),_0px_1px_2px_rgba(88,_102,_126,_0.12)]'>
          {theme?.url && (
            <Image
              src={theme?.url}
              alt=""
              className='absolute right-[0] top-[0] h-full w-full cursor-pointer rounded-[10px]'
              onClick={() => router.push(ROUTE_PATH.THEME_DETAIL(theme?.code))}
              width={161}
              height={252}
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
          )}
          <Link href={ROUTE_PATH.THEME_DETAIL(theme?.code)}>
            <div className='absolute bottom-[10px] left-2/4 w-[calc(100%_-_30px)] -translate-x-1/2 transform rounded-[10px] bg-[rgba(255,_255,_255,_0.8)]'>
              <div className='flex h-[80px] flex-col items-center justify-center px-[8px]'>
                <Text type='body-12-bold' color='primary-5' className='text-center'>
                  {theme?.name}
                </Text>
                {theme.totalSubscribe !== 0 && (
                  <>
                    <Text type='body-12-bold' color='neutral-4' className='my-[6px] text-center'>
                      {theme.totalSubscribe}
                    </Text>
                    <Text type='body-12-bold' color='neutral-4' className='text-center'>
                      {t('common:subscribers')}
                    </Text>
                  </>
                )}
              </div>
              <button
                className='flex h-[32px] w-full flex-row items-center justify-center [border-top:1px_solid_#B1D5F1]'
                onClick={onSubcribe}
              >
                {renderSubcribe()}
              </button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default ThemesItem;
