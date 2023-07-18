import React from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';

interface Props {
  value: string;
  label: string;
  isActive: boolean;
  icon?: React.ReactNode;
  onChangeTab: (value: any) => void;
}

const TabItem: React.FC<Props> = ({ icon, isActive, label, onChangeTab, value }) => {
  const onClickTab = (newTab: any) => {
    onChangeTab(newTab);
  };
  return (
    <div className='cursor-pointer' onClick={() => onClickTab(value)}>
      <div className='mr-[40px]'>
        {icon && <div className=''>{icon}</div>}
        <Text
          type={isActive ? 'body-16-bold' : 'body-16-regular'}
          color={isActive ? 'primary-2' : 'primary-5'}
          className='relative w-max'
        >
          {label}
          {isActive && (
            <div className='absolute -bottom-[10px] left-0 h-[3px] w-full bg-[#1F6EAC]'></div>
          )}
        </Text>
      </div>
      <div
        className={classNames('', {
          'is-active': isActive,
        })}
      />
    </div>
  );
};

export default TabItem;
