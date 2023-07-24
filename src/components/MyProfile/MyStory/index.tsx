import React, { useRef, useContext, useState, forwardRef, useImperativeHandle } from 'react';

import Modal from '@components/UI/Modal/Modal';

import PreViewStory from './PreviewStory';
import Story from './Story';
import { profileUserContext } from '..';

const ModalStory = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open: () => setVisible(true),
    };
  });

  return (
    <>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <Story />
      </Modal>
    </>
  );
});

const MyStory = () => {
  const modalRef = useRef<any>(null);
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      {profileUser?.caption && (
        <div className='mb-[36px] px-[16px] tablet:px-0'>
          <PreViewStory
            openStory={() => {
              modalRef.current?.open && modalRef.current?.open();
            }}
          />

          <ModalStory ref={modalRef} />
        </div>
      )}
    </>
  );
};
export default MyStory;
