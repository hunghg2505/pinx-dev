import Link from 'next/link';
import React from 'react';

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
  isNoFollow,
  ariaLabel = '',
  prefetch = false,
  target,
}: ICustomLink) => {
  return (
    <Link href={href} passHref prefetch={!!prefetch}>
      <div
        className={className}
        aria-label={ariaLabel || 'label'}
        // rel={`noreferrer ${isNoFollow ? 'nofollow' : ''}`}
        // target={target}
      >
        {children}
      </div>
    </Link>
  );
};

CustomLink.displayName = 'CustomLink';

export default CustomLink;
