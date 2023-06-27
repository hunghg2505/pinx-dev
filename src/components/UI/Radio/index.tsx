import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
  checked?: boolean;
  onChange?: () => void;
}

const Radio: React.FC<Props> = ({ children, checked = false, onChange, className }: Props) => {
  return (
    <div
      className={classNames('mb-[5px] mr-[12px] flex cursor-pointer items-center', className)}
      onClick={onChange}
    >
      <div
        className={classNames(
          'relative h-[20px] w-[20px] rounded-full border border-solid border-[#E6E6E6]',
          { [styles.checked]: checked },
        )}
      />
      <div className='ml-[10px]'>{children}</div>
    </div>
  );
};
export default Radio;
