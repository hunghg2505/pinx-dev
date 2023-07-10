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
    <div className='' onClick={() => onClickTab(value)}>
      <div className='mr-[32px]'>
        {icon && <div className=''>{icon}</div>}
        <Text type='body-22-bold' color={isActive ? 'neutral-1' : 'neutral-6'} className='w-max'>
          {label}
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
