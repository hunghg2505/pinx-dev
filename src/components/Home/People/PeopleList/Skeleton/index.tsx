import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

const PeopleLoading = () => {
  return (
    <div
      className={classNames(
        'mr-[16px] inline-block h-[154px] w-[100px] rounded-[15px]',
        styles.content,
      )}
    ></div>
  );
};

export default PeopleLoading;
