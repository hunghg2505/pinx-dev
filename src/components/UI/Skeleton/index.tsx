import styles from './index.module.scss';

const SkeletonLoading = () => {
  return (
    <div className='mb-[20px]'>
      <div className='mb-[20px] flex flex-row items-center gap-x-[15px]'>
        <div className={styles.image}></div>
        <div className={styles.name}>
          <p></p>
          <p></p>
        </div>
      </div>
      <div className={styles.content}>
        <div className='mb-3 h-[200px] bg-[linear-gradient(110deg,_#ececec_8%,_#f5f5f5_18%,_#ececec_33%)] desktop:h-[300px]'></div>
        <h2></h2>
        <h2></h2>
        <h2></h2>
      </div>
    </div>
  );
};
export default SkeletonLoading;
