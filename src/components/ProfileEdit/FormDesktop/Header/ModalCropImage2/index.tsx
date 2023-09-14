import React, { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/named
import Cropper, { Area } from 'react-easy-crop';

import { MainButton, SemiMainButton } from '@components/UI/Button';
import Loading from '@components/UI/Loading';
import Modal from '@components/UI/Modal/Modal';
import RangeSlider from '@components/UI/RangeSlider';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { compressImage } from '@utils/common';
import { getCroppedImg } from '@utils/cropImage';

import styles from './index.module.scss';

interface ModalCropImage2Props {
  visible: boolean;
  onClose: () => void;
  file?: File;
  showZoomControl?: boolean;
  onSuccess?: (blob: Blob | null) => void;
}

const CROP_SIZE = 300;
const INIT_CROP = {
  x: 0,
  y: 0,
};
const ModalCropImage2 = (props: ModalCropImage2Props) => {
  const { visible, onClose, file, showZoomControl, onSuccess } = props;
  const { t } = useTranslation();
  const [crop, setCrop] = useState(INIT_CROP);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [zoom, setZoom] = useState(1);
  const [initZoom, setInitZoom] = useState(0);
  const preValueRangeSliderRef = useRef(0);
  const [sliderPercent, setSliderPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [onCompressing, setOnCompressing] = useState(false);
  const [image, setImage] = useState<string>();

  const { isMobile } = useResponsive();

  useEffect(() => {
    setZoom(initZoom + sliderPercent / 10);
  }, [initZoom, sliderPercent]);

  useEffect(() => {
    setCrop(INIT_CROP);
  }, [initZoom]);

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileSizeMB = file && file.size / 1024 / 1024;
    if (isMobile && fileSizeMB && fileSizeMB > 3) {
      setOnCompressing(true);
      compressImage({
        file,
        maxFileSizeKb: 3 * 1024,
        options: {
          fileType: 'image/jpeg',
        },
      })
        .then((compressedImage) => {
          compressedImage && setImage(URL.createObjectURL(compressedImage));
        })
        .catch(() => {
          console.log('err');
        })
        .finally(() => {
          setOnCompressing(false);
        });
    }

    setImage(URL.createObjectURL(file));
  }, [file]);

  useEffect(() => {
    if (visible) {
      document.body.classList.add('overflow-y-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-y-hidden');
      setCrop(INIT_CROP);
      preValueRangeSliderRef.current = 0;
      image && URL.revokeObjectURL(image);
    };
  }, [visible]);

  const handleCropImage = async () => {
    try {
      if (!image || !croppedAreaPixels) {
        return;
      }

      setLoading(true);
      const blob = await getCroppedImg(image, croppedAreaPixels);
      onSuccess && onSuccess(blob);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} onClose={onClose} closeIcon={<></>} destroyOnClose>
      <div className={styles.cropContainer}>
        {onCompressing ? (
          <div className='flex h-full items-center justify-center'>
            <Loading />
          </div>
        ) : (
          <Cropper
            crop={crop}
            onCropChange={setCrop}
            aspect={1 / 1}
            cropShape='round'
            objectFit='vertical-cover'
            image={image}
            showGrid={false}
            cropSize={{
              width: CROP_SIZE,
              height: CROP_SIZE,
            }}
            zoom={zoom}
            style={{
              cropAreaStyle: {
                color: 'rgba(255, 255, 255, 0.6)',
              },
            }}
            onMediaLoaded={async (mediaSize) => {
              const isHorizontalImage = mediaSize.naturalWidth > mediaSize.naturalHeight;
              const initZoom = CROP_SIZE / (isHorizontalImage ? mediaSize.height : mediaSize.width);
              setInitZoom(initZoom);
            }}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
          />
        )}
      </div>

      {showZoomControl && <RangeSlider className='mt-[12px]' onChange={setSliderPercent} />}

      <div className='mt-[24px] flex items-center justify-center gap-x-[12px] text-center'>
        <SemiMainButton className='mx-auto h-[38px] !py-0 px-[32px]' onClick={onClose}>
          <Text type='body-14-medium'>{t('cancel')}</Text>
        </SemiMainButton>

        <MainButton
          disabled={loading || onCompressing}
          className='mx-auto h-[38px] !py-0 px-[32px]'
          onClick={handleCropImage}
        >
          {loading ? <Loading /> : <Text type='body-14-medium'>{t('save')}</Text>}
        </MainButton>
      </div>
    </Modal>
  );
};

export default ModalCropImage2;
