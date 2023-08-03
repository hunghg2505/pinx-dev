import React from 'react';

import styles from './index.module.scss';

const SkeletonLoading = () => {
  return (
    <div>
      <div className='flex flex-row items-center gap-x-[8px]'>
        <div className={styles.image}></div>
        <div className={styles.name}></div>
      </div>

      <div className={styles.content}></div>
    </div>
  );
};

export default SkeletonLoading;
