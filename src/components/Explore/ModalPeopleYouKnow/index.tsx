import React from 'react';

import Dialog from 'rc-dialog';

import Text from '@components/UI/Text';

import PeopleItem from './PeopleItem';

interface Iprops {
  children: any;
  closeIcon?: boolean;
}

const ModalPeopleYouKnow = (props: Iprops) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const { children, closeIcon } = props;
  const onVisible = () => {
    setVisible(!visible);
  };
  const renderCloseIcon = (): React.ReactNode => {
    if (closeIcon) {
      return closeIcon;
    }
    return (
      <img
        src='/static/icons/iconClose.svg'
        alt=''
        width='0'
        height='0'
        sizes='100vw'
        className='w-[13px]'
      />
    );
  };
  return (
    <>
      <div onClick={onVisible}>{children}</div>
      <Dialog visible={visible} onClose={onVisible} closeIcon={renderCloseIcon()}>
        <div className='pt-[21px]'>
          <Text type='body-20-semibold' color='neutral-1' className='mb-[8px]'>
            People you may know
          </Text>
          <Text type='body-14-regular' color='primary-5'>
            People on PineX that you may know!
          </Text>
          <div className='mt-[16px] flex max-h-[316px] flex-col gap-y-[16px] overflow-y-scroll'>
            <PeopleItem isFollow />
            <PeopleItem />
            <PeopleItem isFollow />
            <PeopleItem />
            <PeopleItem isFollow />
            <PeopleItem />
            <PeopleItem isFollow />
            <PeopleItem />
            <PeopleItem isFollow />
            <PeopleItem />
            <PeopleItem isFollow />
            <PeopleItem />
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalPeopleYouKnow;
