import React, { useRef, useContext } from 'react';

import Modal, { IBaseModal } from '@components/common/Modal';

import PreViewStory from './PreviewStory';
import Story from './Story';
import { profileUserContext } from '..';

const MyStory = () => {
  const modalRef = useRef<HTMLDivElement & IBaseModal>(null);
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      {profileUser?.caption && (
        <div className='px-[16px] mb-[36px]'>
          <PreViewStory
            openStory={() => {
              modalRef.current?.open();
            }}
          />
          <Modal ref={modalRef}>
            <Story
              closeStory={() => {
                modalRef.current?.close();
              }}
            />
          </Modal>
        </div>
      )}
    </>
  );
};
export default MyStory;
