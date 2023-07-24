import React from 'react';

import Dialog from 'rc-dialog';

import Text from '@components/UI/Text';

import Compose from '..';

interface IProps {
  children: any;
  closeIcon?: boolean;
  refresh?: () => void;
}
const ModalComposeMobile = (props: IProps) => {
  const { children, closeIcon, refresh } = props;
  const [visible, setVisible] = React.useState<boolean>(false);
  const onVisible = async () => {
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
      <span onClick={onVisible}>{children}</span>
      <Dialog
        visible={visible}
        onClose={onVisible}
        closeIcon={renderCloseIcon()}
        className='addLinkMobile'
      >
        {/* <Compose hidePopup={hidePopup} refresh={refresh} /> */}
        <div className='h-[100%] text-center'>
          <Text type='body-20-semibold' color='neutral-black'>
            Create post
          </Text>
          <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <div className='mobile-max:h-[70%]'>
            <Compose hidePopup={onVisible} refresh={refresh} />
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default ModalComposeMobile;
