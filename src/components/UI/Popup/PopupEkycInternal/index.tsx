import { useAtom } from 'jotai';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';
import { popupStatusAtom } from '@store/popup/popup';
import { APP_STORE_DOWNLOAD, GOOGLE_PLAY_DOWNLOAD } from 'src/constant';

const handleRedirect = (url: string) => {
  window.open(url, '_blank');
};

interface IProps {
  visible: boolean;
}

const PopUpEkycInternal = (props: IProps) => {
  const { t } = useTranslation();
  const { visible } = props;
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const handleClose = () => {
    setPopupStatus({
      ...popupStatus,
      popupEkyc: false,
    });
  };

  return (
    <Modal visible={visible} onClose={handleClose}>
      <div className=''>
        <Text
          type='body-20-bold'
          color='neutral-1'
          className='mb-[12px] text-center tablet:!text-[24px]'
        >
          {t('access_limited')}
        </Text>
        <Text type='body-16-regular' color='neutral-3' className='mb-[24px] text-center'>
          {t('upgrade_your_account')}
        </Text>

        <div className='gap-x-[13px] mobile:flex tablet:hidden'>
          <div
            className='flex h-[49px] w-[calc((100%_-_16px)_/_2)] cursor-pointer flex-row items-center justify-center rounded-[8px] border-[1px] border-solid border-[#B1D5F1] bg-[var(--primary-03,_#EAF4FB)]'
            onClick={handleClose}
          >
            <Text type='body-16-bold' color='primary-2'>
              {t('cancel')}
            </Text>
          </div>
          <Link
            href='https://onelink.to/cgarrk'
            className='flex h-[49px] w-[calc((100%_-_16px)_/_2)] cursor-pointer flex-row items-center justify-center rounded-[8px] bg-[linear-gradient(270deg,_#1D6CAB_0%,_#589DC0_100%)]'
          >
            <Text type='body-16-bold' color='cbwhite'>
              {t('ok')}
            </Text>
          </Link>
        </div>
        <div className='justify-center gap-x-[23px] mobile:hidden tablet:flex'>
          <img
            src='/static/images/googleplay.png'
            alt='Download google play'
            width={180}
            height={52}
            className='h-[52px] w-[180px] cursor-pointer object-contain'
            onClick={() => handleRedirect(GOOGLE_PLAY_DOWNLOAD)}
          />

          <img
            src='/static/images/appstore.png'
            alt='Download app store'
            width={180}
            height={52}
            className='h-[52px] w-[180px] cursor-pointer object-contain'
            onClick={() => handleRedirect(APP_STORE_DOWNLOAD)}
          />
        </div>
      </div>
    </Modal>
  );
};
export default PopUpEkycInternal;
