import classNames from 'classnames';

import styles from './index.module.scss';

const Loading = ({ className }: any) => {
  return <div className={classNames(styles.spinner3, className)}></div>;
};
export default Loading;
