import React from 'react';

import classNames from 'classnames';
import Image from 'next/image';

import Text from '@components/UI/Text';

import styles from './index.module.scss';

interface IThemeCardProps {
  image?: string;
  title?: string;
  isSelected: boolean;
  listUserLikeThis?: any;
}

const ThemeCard = (props: IThemeCardProps) => {
  return (
    <div
      className={classNames('flex justify-center overflow-hidden rounded-[13px]', {
        [styles.selected]: props?.isSelected,
        [styles.notSelected]: !props?.isSelected,
      })}
    >
      <div className="relative h-[247px] w-[100%] bg-[url('/static/images/theme1.png')] bg-cover bg-center bg-no-repeat before:absolute before:bottom-[0] before:left-[0] before:h-full before:w-full before:rounded-[12px] before:content-['']">
        <div className='absolute left-0 top-[115px] h-[132px] w-[100%] rounded-bl-[12px] rounded-br-[12px] rounded-tl-none rounded-tr-none bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_0%,_rgba(0,_0,_0,_0.7)_100%)]'></div>
        <div className='absolute bottom-[12px] left-[15px] z-10 pr-[10px]'>
          <Text type='body-14-bold' color='neutral-9'>
            {props.title}
          </Text>
          <div className='mt-[6px] flex'>
            <Image
              src='/static/icons/avatar.svg'
              alt=''
              width='20'
              height='20'
              className='w-[20px]'
            />
            <Image
              src='/static/icons/avatar.svg'
              alt=''
              width='20'
              height='20'
              className='ml-[-3px]  w-[20px]'
            />
            <Image
              src='/static/icons/avatar.svg'
              alt=''
              width='20'
              height='20'
              className='ml-[-3px]  w-[20px]'
            />
            <Text
              type='body-12-medium'
              color='neutral-8'
              className='ml-[7px] flex h-[20px] items-center'
            >
              3000+
            </Text>
          </div>
        </div>
        <div className='absolute right-[13px] top-[13px] flex h-[24px] w-[24px] flex-row items-center justify-center '>
          {props.isSelected && (
            <Image
              src='/static/icons/iconSelected.svg'
              alt=''
              width='24'
              height='24'
              className='mr-[5px]'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeCard;
