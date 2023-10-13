import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

const InfluencerLoading = () => {
  const skeletonList = [0, 1, 2, 3];
  return (
    <div className='overflow-x-hidden whitespace-nowrap'>
      {skeletonList.map((item) => (
        <div
          key={item}
          className={classNames(
            'mr-[16px] inline-block h-[252px] w-[161px] rounded-[15px]',
            styles.content,
          )}
        />
      ))}

    </div>
  );
};

export default InfluencerLoading;
