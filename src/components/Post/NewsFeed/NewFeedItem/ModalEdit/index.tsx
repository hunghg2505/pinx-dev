import React from 'react';

import { useDebounceFn } from 'ahooks';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';

const Compose = dynamic(() => import('@components/Compose'));
interface Iprops {
  children: any;
  closeIcon?: boolean;
  refresh?: () => void;
  postDetail: any;
  visible: boolean;
  onVisible: (visible: boolean) => void;
}
const ModalEdit = (props: Iprops, ref: any) => {
  const { t } = useTranslation('common');
  const { closeIcon, refresh, children, postDetail, visible, onVisible: setVisible } = props;
  const [value, setValue] = React.useState<any>();
  const [visibleConfirm, setVisibleConfirm] = React.useState(false);
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
  const { run } = useDebounceFn(
    (value) => {
      setValue(value);
    },
    {
      wait: 500,
    },
  );
  const onVisible = () => {
    setValue(undefined);
    setVisible(!visible);
  };
  const onCloseModal = () => {
    if (value) {
      setVisibleConfirm(true);
    } else {
      setVisible(false);
    }
  };
  const onGetData = (value: any) => {
    run(value);
  };
  const onOk = () => {
    setVisible(false);
    setVisibleConfirm(false);
  };
  const onCancel = () => {
    setVisibleConfirm(false);
  };
  const hidePopup = () => {
    setVisibleConfirm(false);
    setVisible(false);
    setValue('');
  };
  React.useImperativeHandle(ref, () => ({ onVisible }));

  return (
    <>
      <span onClick={onVisible}>{children}</span>
      <Modal
        visible={visible}
        onClose={onCloseModal}
        closeIcon={renderCloseIcon()}
        className='compose'
        destroyOnClose={true}
      >
        <div className='text-center'>
          <Text type='body-20-semibold' color='neutral-black'>
            Edit post
          </Text>
          <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <div>
            <Compose
              hidePopup={hidePopup}
              refresh={refresh}
              onGetData={onGetData}
              postDetail={postDetail}
              isUpdate={true}
            />
          </div>
        </div>
      </Modal>

      <Modal
        visible={visibleConfirm}
        onClose={onGetData as any}
        closable={false}
        className='compose'
      >
        <div className=''>
          <Text type='body-20-semibold' color='neutral-black'>
            {t('quit')}
          </Text>
          <Text type='body-14-regular' color='cbblack'>
            {t('quit.desc')}
          </Text>
          <div className='mt-[32px] flex items-center justify-between gap-x-[12px]'>
            <div
              className='flex h-[52px] w-[180px] flex-1 cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[linear-gradient(0deg,_#B1D5F1,_#B1D5F1),linear-gradient(0deg,_#EFF2F5,_#EFF2F5)]'
              onClick={onCancel}
            >
              <Text type='body-16-bold' color='primary-2'>
                {t('cancel')}
              </Text>
            </div>
            <div
              className='flex h-[52px] w-[180px] flex-1 cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[#1F6EAC]'
              onClick={onOk}
            >
              <Text type='body-16-bold' color='cbwhite'>
                {t('ok')}
              </Text>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default React.forwardRef(ModalEdit);
