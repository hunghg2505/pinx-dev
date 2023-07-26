import React, { useState } from 'react';

import Modal from '@components/UI/Modal/Modal';

interface IPropsModalMedia {
  children: any;
  url: string;
}

const ModalMedia = ({ children, url }: IPropsModalMedia) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <span onClick={() => setVisible(true)}>{children}</span>

      <Modal visible={visible} onClose={() => setVisible(false)}>
        <img src={url} alt='' />
      </Modal>
    </>
  );
};

export default ModalMedia;
