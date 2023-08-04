import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

const SkeletonLoading = () => {
  return (
    <div className='rounded-[16px] border border-solid border-[#EBEBEB] p-[16px]'>
      <div className='flex flex-row items-center gap-x-[8px]'>
        <div className={styles.image}></div>
        <div className={styles.name}>
          <p></p>
          <p></p>
        </div>

        <div className={classNames('ml-auto h-[36px] w-[36px] rounded-full', styles.image)}></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
