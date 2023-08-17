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
export default SkeletonLoading;
