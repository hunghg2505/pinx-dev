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
        <h2></h2>
        <h2></h2>
        <h2></h2>
      </div>
    </div>
  );
};
export default SkeletonLoading;
