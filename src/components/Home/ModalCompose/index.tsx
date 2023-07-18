import React from 'react';

import dynamic from 'next/dynamic';
import Dialog from 'rc-dialog';

import Text from '@components/UI/Text';

const Compose = dynamic(() => import('@components/Compose'), {
  ssr: false,
});
interface Iprops {
  closeIcon?: boolean;
  refresh?: () => void;
}
const ModalCompose = (props: Iprops, ref: any) => {
  const { closeIcon, refresh } = props;
  const [visible, setVisible] = React.useState(false);
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
  const onVisible = () => {
    setVisible(!visible);
  };

  React.useImperativeHandle(ref, () => ({ onVisible }));

  return (
    <>
      <Dialog
        visible={visible}
        onClose={onVisible}
        closeIcon={renderCloseIcon()}
        className='compose'
      >
        <div className='text-center'>
          <Text type='body-20-semibold' color='neutral-black'>
            Create post
          </Text>
          <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <div>
            <Compose hidePopup={onVisible} refresh={refresh} />
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default React.forwardRef(ModalCompose);
