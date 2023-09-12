import React, { useState } from 'react';

import Image from 'next/image';

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
        <Image width='0' height='0' sizes='100vw' loading='lazy' src={url} alt='' />
      </Modal>
    </>
  );
};

export default ModalMedia;
