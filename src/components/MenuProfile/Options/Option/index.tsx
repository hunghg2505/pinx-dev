import React from 'react';

import Link from 'next/link';

const Option = ({ icon, name, link, action }: { icon: string; name: string; link: any, action?: () => void }) => {
  return (
    <Link href={link} className='flex items-center py-4 px-[28px]' onClick={action}>
      <img src={icon} className='mr-[16px] h-[24px] w-[24px]' alt={name} width={24} height={24} />
      <span>{name}</span>
    </Link>
  );
};
export default Option;
