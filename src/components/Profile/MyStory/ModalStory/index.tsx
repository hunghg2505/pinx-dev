import React, { ReactNode, useState } from 'react';

import classNames from 'classnames';

import AvatarDefault from '@components/UI/AvatarDefault';
import CustomImage from '@components/UI/CustomImage';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { isUrlValid } from '@utils/common';

import styles from './index.module.scss';

interface IModalStoryProps {
  children: ReactNode;
  profileUser: any;
}

const ModalStory = ({ children, profileUser }: IModalStoryProps) => {
  const [visible, setVisible] = useState(false);

  const onVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <div onClick={onVisible}>{children}</div>
      <Modal visible={visible} onClose={onVisible} className={styles.modalStory}>
        <article className='overflow-hidden rounded-[12px] text-white'>
          <header className='relative h-[375px] max-h-[375px]'>
            {isUrlValid(profileUser?.avatar) ? (
              <CustomImage
                width='0'
                height='0'
                sizes='100vw'
                src={profileUser?.avatar}
                alt='story picture'
                className='relative h-full w-full object-cover'
              />
            ) : (
              <div className='relative h-full w-full object-cover'>
                <AvatarDefault
                  className='!rounded-none'
                  nameClassName='text-[100px]'
                  name={profileUser?.displayName}
                />
              </div>
            )}
            <div className='absolute left-0 top-0 z-10 flex h-full w-full bg-gradient-to-t from-neutral_black to-[transparent] px-[20px] pb-[12px] pt-[20px]'>
              <div className='mt-auto w-full text-center'>
                <div className='flex items-center justify-center'>
                  <Text
                    type='body-24-semibold'
                    className='max-w-[150px] truncate galaxy-max:text-[20px] laptop:max-w-[200px]'
                    color='cbwhite'
                  >
                    {profileUser?.displayName}
                  </Text>

                  {profileUser?.isKol && (
                    <img
                      src='/static/icons/iconTick.svg'
                      alt=''
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='ml-[8px] h-[18px] w-[18px] object-contain'
                    />
                  )}

                  {profileUser?.isFeatureProfile && (
                    <img
                      src='/static/icons/iconKol.svg'
                      alt=''
                      width={0}
                      height={0}
                      sizes='100vw'
                      className='ml-[2px] h-[24px] w-[24px] object-contain'
                    />
                  )}
                </div>
                <Text type='body-14-regular' className='galaxy-max:text-[12px]' color='cbwhite'>
                  {profileUser?.position}
                </Text>
              </div>
            </div>
          </header>
          <main className='bg-neutral_black px-[16px] pb-[20px] pt-[40px]'>
            <div
              className={classNames(
                'h-[210px] w-full overflow-auto galaxy-max:h-[180px]',
                styles.caption,
              )}
            >
              <Text
                type='body-16-regular'
                className='whitespace-pre-line leading-[21px] galaxy-max:text-[14px]'
              >
                {profileUser?.caption}
              </Text>

              {profileUser?.fullDes && (
                <Text
                  type='body-16-regular'
                  color='cbwhite'
                  className='mt-[21px] whitespace-pre-line leading-[21px]'
                >
                  {profileUser.fullDes}
                </Text>
              )}
            </div>
          </main>
        </article>
      </Modal>
    </>
  );
};

export default ModalStory;
