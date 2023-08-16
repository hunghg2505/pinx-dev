import React, { useState } from 'react';

import Modal from '@components/UI/Modal/Modal';

import styles from './index.module.scss';

interface IPropsModalMedia {
  children: any;
  url: string;
}

const ModalMedia = ({ children, url }: IPropsModalMedia) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <Modal
        visible={visible}
        onClose={() => setVisible(false)}
        closeIcon={<></>}
        className={styles.modalMedia}
      >
        <img loading='lazy' src={url} alt='' />
      </Modal>
    </>
  );
};

export default ModalMedia;
