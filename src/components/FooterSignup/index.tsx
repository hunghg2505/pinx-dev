import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { useContainerDimensions } from '@hooks/useDimensions';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';
import { RegisterTracking } from '@utils/dataLayer';

const SCREEN_MOBILE_WIDTH = 768;
const FooterSignUp = () => {
  const { t } = useTranslation('common');
  const [scrollTop, setScrollTop] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const router = useRouter();
  const { isLogin } = useAuth();

  const footerRef = useRef(null);

  const { width } = useContainerDimensions(footerRef);

  useEffect(() => {
    setFooterHeight(width <= SCREEN_MOBILE_WIDTH ? 49 : 64);
  }, [width]);

  useEffect(() => {
    let lastScrollTop = 0;
    let lastTimestamp = Date.now();
    let scrollSpeed = 0;

    const handleScroll = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - lastTimestamp;
      let scrollTop = window.scrollY || window.pageYOffset;
      scrollTop = scrollTop >= 0 ? scrollTop : 0;
      const scrollDistance = Math.abs(scrollTop - lastScrollTop);

      scrollSpeed = scrollDistance / elapsedTime;

      if (scrollTop > lastScrollTop) {
        setScrollTop(scrollTop > footerHeight ? footerHeight : scrollTop);
      } else {
        // scrolling to top
        setScrollTop((prev) => (scrollSpeed > 1 ? 0 : prev));
      }

      lastScrollTop = scrollTop;
      lastTimestamp = currentTime;
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [footerHeight]);

  const redirectToSignUp = () => {
    const date = new Date();
    RegisterTracking(date, 'Footer', 'CTA');
    router.push({
      pathname: ROUTE_PATH.LOGIN,
      query: {
        type: 'register',
      },
    });
  };

  const redirectToLogin = () => {
    router.push({
      pathname: ROUTE_PATH.LOGIN,
    });
  };

  if (isLogin) {
    return <></>;
  }

  return (
    <footer
      ref={footerRef}
      className='fixed bottom-0 left-0 right-0 z-50'
      style={{ height: `${footerHeight}px` }}
    >
      {/* mobile */}
      <div
        style={{ transform: `translateY(${scrollTop.toFixed(0)}px)` }}
        className='flex h-full items-center border-t border-solid border-t-[var(--neutral-6)] bg-white px-[8px] transition galaxy-max:justify-center tablet:hidden'
      >
        <button
          onClick={redirectToSignUp}
          className='h-[26px] rounded-[4px] bg-[var(--primary-2)] px-[12px]'
        >
          <Text type='body-14-semibold' className='galaxy-max:text-[12px]' color='cbwhite'>
            {t('sign_up')}
          </Text>
        </button>

        <Text type='body-14-regular' color='primary-5' className='mx-[8px]'>
          {t('or')}
        </Text>

        <button
          onClick={redirectToLogin}
          className='h-[26px] rounded-[4px] border border-solid border-[var(--primary-6)] bg-[var(--primary-3)] px-[12px]'
        >
          <Text type='body-14-semibold' className='galaxy-max:text-[12px]' color='primary-2'>
            {t('log_in')}
          </Text>
        </button>

        <Text
          type='body-14-regular'
          color='primary-5'
          className='ml-[8px] flex-1 galaxy-max:hidden'
        >
          {t('to_join_the_discussion')}
        </Text>
      </div>

      {/* > tablet */}
      {/* <div
        style={{ transform: `translateY(${scrollTop.toFixed(0)}px)` }}
        className='z-[999] h-full w-full items-center border-t border-solid border-t-[var(--primary-3)] bg-white transition mobile:hidden tablet:flex'
      >
        <div className='mx-auto w-full max-w-[1355px]'>
          <div className='flex h-[37px] w-full items-center pl-[10px] desktop:pl-[calc(218px+24px+10px)]'>
            <button
              onClick={redirectToSignUp}
              className='h-full rounded-[4px] bg-[var(--primary-2)] px-[24px]'
            >
              <Text type='body-16-semibold' color='cbwhite'>
                {t('sign_up')}
              </Text>
            </button>

            <Text type='body-16-semibold' color='primary-5' className='mx-[8px]'>
              {t('or')}
            </Text>

            <button
              onClick={redirectToLogin}
              className='h-full rounded-[4px] border border-solid border-[var(--primary-6)] bg-[var(--primary-3)] px-[24px]'
            >
              <Text type='body-16-semibold' color='primary-2'>
                {t('log_in')}
              </Text>
            </button>

            <Text type='body-16-semibold' color='primary-5' className='ml-[8px]'>
              {t('to_join_the_discussion')}
            </Text>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default FooterSignUp;
