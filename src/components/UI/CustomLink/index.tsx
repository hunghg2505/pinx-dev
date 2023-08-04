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
  onClick?: () => void;
}

const CustomLink = ({
  children,
  href,
  className = '',
  ariaLabel = '',
  prefetch = false,
  target = '_self',
  onClick,
}: ICustomLink) => {
  return (
    <Link
      href={href}
      passHref
      prefetch={!!prefetch}
      aria-label={ariaLabel || 'label'}
      // rel={`noreferrer ${isNoFollow ? 'nofollow' : ''}`}
      target={target}
    >
      <div onClick={onClick} className={className}>
        {children}
      </div>
    </Link>
  );
};

CustomLink.displayName = 'CustomLink';

export default CustomLink;
