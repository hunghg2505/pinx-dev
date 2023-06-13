import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

interface Props {
  children: React.ReactNode;
  checked?: boolean;
  onChange?: () => void;
}

const Radio: React.FC<Props> = ({ children, checked = false, onChange }: Props) => {
  return (
    <div className='mb-[5px] mr-[12px] flex cursor-pointer items-center' onClick={onChange}>
      <div
        className={classNames(
          'relative h-[15px] w-[15px] rounded-full border border-solid border-black',
          { [styles.checked]: checked },
        )}
      />
      <div className='ml-[10px]'>{children}</div>
    </div>
  );
};
export default Radio;
