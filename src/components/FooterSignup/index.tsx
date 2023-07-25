import React, { useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Text from '@components/UI/Text';
import { useContainerDimensions } from '@hooks/useDimensions';
import { useAuth } from '@store/auth/useAuth';
import { ROUTE_PATH } from '@utils/common';

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
      className='fixed bottom-0 left-0 right-0 z-10'
      style={{ height: `${footerHeight}px` }}
    >
      {/* mobile */}
      <div
        style={{ transform: `translateY(${scrollTop.toFixed(0)}px)` }}
        className='flex h-full items-center border-t border-solid border-t-[var(--neutral-6)] bg-white px-[8px] transition tablet:hidden desktop:hidden'
      >
        <button
          onClick={redirectToSignUp}
          className='h-[26px] min-w-[83px] rounded-[4px] bg-[var(--primary-2)] px-[16px]'
        >
          <Text type='body-14-semibold' color='cbwhite'>
            {t('sign_up')}
          </Text>
        </button>

        <Text type='body-14-regular' color='primary-5' className='mx-[8px]'>
          {t('or')}
        </Text>

        <button
          onClick={redirectToLogin}
          className='h-[26px] min-w-[73px] rounded-[4px] border border-solid border-[var(--primary-6)] bg-[var(--primary-3)] px-[16px]'
        >
          <Text type='body-14-semibold' color='primary-2'>
            {t('log_in')}
          </Text>
        </button>

        <Text type='body-14-regular' color='primary-5' className='ml-[8px] flex-1'>
          {t('log_in')}
        </Text>
      </div>

      {/* > tablet */}
      <div
        style={{ transform: `translateY(${scrollTop.toFixed(0)}px)` }}
        className=' h-full w-full items-center justify-center border-t border-solid border-t-[var(--primary-3)] bg-white transition mobile:hidden tablet:flex '
      >
        <Text
          type='body-20-medium'
          color='primary-5'
          className='tablet:mr-[100px] desktop:mr-[352px]'
        >
          {t('footer_content')}
        </Text>

        <div className='flex h-[37px] items-center'>
          <button
            onClick={redirectToSignUp}
            className='mr-[16px] h-full min-w-[107px] rounded-[4px] bg-[var(--primary-2)] px-[24px]'
          >
            <Text type='body-16-semibold' color='cbwhite'>
              {t('sign_up')}
            </Text>
          </button>

          <button
            onClick={redirectToLogin}
            className='h-full min-w-[73px] rounded-[4px] border border-solid border-[var(--primary-6)] bg-[var(--primary-3)] px-[30px]'
          >
            <Text type='body-16-semibold' color='primary-2'>
              {t('log_in')}
            </Text>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default FooterSignUp;
