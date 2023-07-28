import React, { useRef, useContext } from 'react';

import BaseModal from './BaseModal';
import PreViewStory from './PreviewStory';
import Story from './Story';
import { profileUserContext } from '..';

const MyStory = () => {
  const modalRef = useRef<any>(null);
  const profileUser = useContext<any>(profileUserContext);
  return (
    <>
      {profileUser?.caption && (
        <div className='mb-[24px] px-[16px] tablet:px-0'>
          <PreViewStory
            openStory={() => {
              modalRef.current?.open();
            }}
          />
          <BaseModal ref={modalRef}>
            <Story
              closeStory={() => {
                modalRef.current?.close();
              }}
            />
          </BaseModal>
        </div>
      )}
    </>
  );
};
export default MyStory;
