/* eslint-disable quotes */
import React from 'react';

import classNames from 'classnames';

import AvatarDefault from '@components/UI/AvatarDefault';
import Text from '@components/UI/Text';
import { isUrlValid } from '@utils/common';

import styles from './index.module.scss';

interface IThemeCardProps {
  image: string;
  title: string;
  isSelected: boolean;
  latestUserLikeThis: any[];
  totalSubscribe: number;
}

const ThemeCard = (props: IThemeCardProps) => {
  return (
    <div
      className={classNames('flex justify-center overflow-hidden rounded-[13px]', {
        [styles.selected]: props.isSelected,
        [styles.notSelected]: !props.isSelected,
      })}
    >
      <div
        className={
          "max-[375px]:h-[250px] relative h-[247px] w-[100%] bg-cover bg-center bg-no-repeat before:absolute before:bottom-[0] before:left-[0] before:h-full before:w-full before:rounded-[12px] before:content-['']"
        }
      >
        <img
          src={props.image}
          height='247'
          width='100'
          className='w-100% max-[375px]:h-[250px] h-[247px]'
          alt={''}
        />
        <div className='absolute bottom-0 left-0 z-10 h-[95px] w-[100%] rounded-tl-[12px] rounded-tr-[12px] bg-[rgba(248,248,248,0.5)]'></div>
        <div className='absolute bottom-[12px] left-[15px] z-10 pr-[10px]'>
          <Text type='body-14-bold' color='neutral-2'>
            {props.title}
          </Text>
          <div className='mt-[6px] flex'>
            {props.latestUserLikeThis?.map(
              (user: { id: number; avatar: string; displayName: string }) => {
                return isUrlValid(user?.avatar) ? (
                  <img
                    src={user.avatar}
                    alt=''
                    width='20'
                    height='20'
                    className='h-[20px] w-[20px] rounded-full'
                  />
                ) : (
                  <div className='h-[20px] w-[20px] rounded-full'>
                    <AvatarDefault nameClassName='text-[12px]' name={user?.displayName} />
                  </div>
                );
              },
            )}
            <Text
              type='body-12-medium'
              color='neutral-2'
              className='ml-[7px] flex h-[20px] items-center'
            >
              {props.totalSubscribe}+
            </Text>
          </div>
        </div>
        <div className='absolute right-[13px] top-[13px] flex h-[24px] w-[24px] flex-row items-center justify-center '>
          {props.isSelected && (
            <img
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
