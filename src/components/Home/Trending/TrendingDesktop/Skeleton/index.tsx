import styles from './index.module.scss';

const TrendingDesktopLoading = () => {
  return (
    <div className='mb-[20px] flex flex-row items-center gap-x-[15px]'>
      <div className={styles.image}></div>
      <div className={styles.name}>
        <p></p>
      </div>
    </div>
  );
};
export default TrendingDesktopLoading;
