import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';
import PopupComponent from '@utils/PopupComponent';

const onCancel = () => {
  PopupComponent.close();
};
const onOke = () => {
  window.location.href = `${ROUTE_PATH.LOGIN}`;
};
const PopUpEkyc = () => {
  return (
    <div className='container-popup-notification'>
      <div className='md-modal-mask' onClick={onCancel}></div>
      <div className='fixed left-2/4 top-2/4 z-20 mx-[auto] my-[0] -translate-x-1/2 -translate-y-1/2 transform bg-[#EAF4FB] p-[24px] mobile:w-[calc(100%_-_32px)] tablet:w-[500px]'>
        <Text type='body-20-bold' color='neutral-1' className='mb-[12px] text-center'>
          Access Limited
        </Text>
        <Text type='body-16-regular' color='primary-5' className='mb-[24px] text-center'>
          You need to upgrade your account to gain access to this feature
        </Text>
        <div className='flex gap-x-[13px]'>
          <div
            className='flex h-[49px] w-[calc((100%_-_16px)_/_2)] cursor-pointer flex-row items-center justify-center rounded-[8px] border-[1px] border-solid border-[#B1D5F1] bg-[var(--primary-03,_#EAF4FB)]'
            onClick={onCancel}
          >
            <Text type='body-16-bold' color='primary-2'>
              Cancel
            </Text>
          </div>
          <div
            className='flex h-[49px] w-[calc((100%_-_16px)_/_2)] cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[linear-gradient(270deg,_#1D6CAB_0%,_#589DC0_100%)]'
            onClick={onOke}
          >
            <Text type='body-16-bold' color='cbwhite'>
              Ok
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopUpEkyc;
