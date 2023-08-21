/* eslint-disable unicorn/no-useless-spread */
import { useMemo } from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

const SkeletonLoading = ({
  hiddenImg = true,
  className,
}: {
  hiddenImg?: boolean;
  className?: string;
}) => {
  return (
    <div className={classNames('mb-[40px]', className)}>
      <div className='mb-[20px] flex flex-row items-center gap-x-[15px]'>
        <div className={styles.image}></div>
        <div className={styles.name}>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className={classNames('pl-0 tablet:pl-[70px]', styles.content)}>
        <h2></h2>
        <h2></h2>
        <h2></h2>
        {hiddenImg && (
          <div className='mb-3 h-[200px] rounded-[12px] bg-[linear-gradient(110deg,_#ececec_8%,_#f5f5f5_18%,_#ececec_33%)] desktop:h-[300px]'></div>
        )}
      </div>
    </div>
  );
};

interface ISkeleton {
  width?: number;
  height?: number;
  avatar?: boolean;
  className?: string;
  wrapClassName?: string;
  round?: boolean;
  rows?: number;
  active?: boolean;
}

export const Skeleton = (props: ISkeleton) => {
  const { width, height, avatar, className, round, rows = 1, active = true, wrapClassName } = props;

  const styleObj = useMemo(() => {
    const style: any = {};
    if (width) {
      style.width = width + 'px';
    }

    if (height) {
      style.height = height + 'px';
    }

    if (active) {
      style.animation = '1.5s shine linear infinite';
    }

    return style;
  }, [width, height, active]);

  return (
    <div className={classNames('flex flex-col gap-y-[8px]', wrapClassName)}>
      {[...new Array(rows)].map((_, index) => (
        <div
          key={index}
          className={classNames(styles.skeleton, className, {
            '!h-[36px] !w-[36px] !rounded-full': avatar,
            '!rounded-full': round,
          })}
          style={styleObj}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLoading;
