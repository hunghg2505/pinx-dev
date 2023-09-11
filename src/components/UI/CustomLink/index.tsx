import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { ROUTE_PATH } from '@utils/common';

interface ICustomLink {
  children: React.ReactNode | string;
  href: string;
  className?: string;
  isNoFollow?: boolean;
  prefetch?: boolean;
  ariaLabel?: string;
  target?: string;
  onClick?: () => void;
  linkClassName?: string;
}

const CustomLink = ({
  children,
  href,
  linkClassName = '',
  className = '',
  ariaLabel = '',
  prefetch = false,
  target = '_self',
  onClick,
}: ICustomLink) => {
  const router = useRouter();
  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);
  const handleClickLink = () => {
    if (!isPostDetailPath && href !== ROUTE_PATH.HOME) {
      globalThis?.sessionStorage.setItem('scrollPosition', String(window?.scrollY));
    }
    onClick && onClick();
  };
  return (
    <Link
      href={href}
      passHref
      prefetch={!!prefetch}
      aria-label={ariaLabel || 'label'}
      // rel={`noreferrer ${isNoFollow ? 'nofollow' : ''}`}
      target={target}
      className={linkClassName}
    >
      <div onClick={handleClickLink} className={className}>
        {children}
      </div>
    </Link>
  );
};

CustomLink.displayName = 'CustomLink';

export default CustomLink;
