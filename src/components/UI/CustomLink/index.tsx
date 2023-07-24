import React from 'react';

import Link from 'next/link';

interface ICustomLink {
  children: React.ReactNode | string;
  href: string;
  className?: string;
  isNoFollow?: boolean;
  prefetch?: boolean;
  ariaLabel?: string;
  target?: string;
}

const CustomLink = ({
  children,
  href,
  className = '',
  ariaLabel = '',
  prefetch = false,
  target = '_self',
}: ICustomLink) => {
  return (
    <Link
      href={href}
      passHref
      prefetch={!!prefetch}
      className={className}
      aria-label={ariaLabel || 'label'}
      // rel={`noreferrer ${isNoFollow ? 'nofollow' : ''}`}
      target={target}
    >
      <>{children}</>
    </Link>
  );
};

CustomLink.displayName = 'CustomLink';

export default CustomLink;
