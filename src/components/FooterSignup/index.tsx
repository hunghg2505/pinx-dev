import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

const HEADER_HEIGHT = 50;
const FooterSignUp = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const router = useRouter();

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
        setScrollTop(scrollTop > HEADER_HEIGHT ? HEADER_HEIGHT : scrollTop);
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
  }, []);

  const redirectToSignUp = () => {
    router.push({
      pathname: ROUTE_PATH.LOGIN,
      query: {
        type: 'register',
      },
    });
  };

  return (
    <div
      style={{ transform: `translateY(${scrollTop.toFixed(0)}px)`, height: HEADER_HEIGHT }}
      className='fixed bottom-0 z-10 flex min-w-[375px] items-center border-t border-solid border-t-[var(--neutral-6)] bg-white px-[16px] transition desktop:hidden'
    >
      <Text type='body-14-regular' className='primary-5'>
        Sign up or Log in to join the discussion
      </Text>

      <button
        onClick={redirectToSignUp}
        className='ml-[6px] h-[26px] min-w-[83px] rounded-[4px] bg-[var(--primary-2)] px-[16px]'
      >
        <Text type='body-14-semibold' color='cbwhite'>
          Sign up
        </Text>
      </button>
    </div>
  );
};

export default FooterSignUp;
