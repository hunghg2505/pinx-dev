import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

const ThemeLoading = () => {
  return (
    <div
      className={classNames(
        'mr-[16px] inline-block h-[252px] w-[161px] rounded-[15px]',
        styles.content,
      )}
    ></div>
  );
};

export default ThemeLoading;
