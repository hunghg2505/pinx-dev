import styles from './index.module.scss';

const PeopleDesktopLoading = () => {
  return (
    <div className='mb-[20px] flex items-center justify-between'>
      <div className='flex flex-row items-center gap-x-[15px]'>
        <div className={styles.image}></div>
        <div className={styles.name}>
          <p></p>
          <p></p>
        </div>
      </div>

      <div className={styles.button}></div>
    </div>
  );
};
export default PeopleDesktopLoading;
