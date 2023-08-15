import React from 'react';

import CustomLink from '@components/UI/CustomLink';

const Option = ({
  icon,
  name,
  link,
  action,
}: {
  icon: string;
  name: string;
  link: any;
  action?: () => void;
}) => {
  return (
    <CustomLink href={link} className='flex items-center px-[28px] py-4' onClick={action}>
      <img
        loading='lazy'
        src={icon}
        className='mr-[16px] h-[24px] w-[24px]'
        alt={name}
        width={24}
        height={24}
      />
      <span>{name}</span>
    </CustomLink>
  );
};
export default Option;
