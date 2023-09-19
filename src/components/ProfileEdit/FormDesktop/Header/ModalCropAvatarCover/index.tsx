import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useSize } from 'ahooks';
import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/named
import Cropper, { Area, CropperProps, MediaSize } from 'react-easy-crop';
import { toast } from 'react-hot-toast';

import { MainButton, SemiMainButton } from '@components/UI/Button';
import Loading from '@components/UI/Loading';
import Modal from '@components/UI/Modal/Modal';
import RangeSlider from '@components/UI/RangeSlider';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { compressImage } from '@utils/common';
import { getCroppedImg } from '@utils/cropImage';
import { AVATAR_SIZE } from 'src/constant';

import styles from './index.module.scss';

interface ModalCropAvatarCoverProps {
  visible: boolean;
  onClose: () => void;
  file?: File;
  showZoomControl?: boolean;
  onSuccess?: (blob: Blob | null) => void;
  options?: CropperProps;
  cropCover?: boolean;
}

const CROP_SIZE = 300;
const INIT_CROP = {
  x: 0,
  y: 0,
};
const ModalCropAvatarCover = (props: ModalCropAvatarCoverProps) => {
  const { visible, onClose, file, showZoomControl, onSuccess, options, cropCover } = props;
  const { t } = useTranslation();
  const [crop, setCrop] = useState(INIT_CROP);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [zoom, setZoom] = useState(1);
  const [initZoom, setInitZoom] = useState(0);
  const preValueRangeSliderRef = useRef(0);
  const containerRef = useRef(null);
  const [sliderPercent, setSliderPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [onCompressing, setOnCompressing] = useState(false);
  const [image, setImage] = useState<string>();
  const [mediaSize, setMediaSize] = useState<MediaSize>();

  const { isMobile } = useResponsive();
  const size = useSize(containerRef);

  useEffect(() => {
    setZoom(initZoom + sliderPercent / 10);
  }, [initZoom, sliderPercent]);

  useEffect(() => {
    setCrop(INIT_CROP);
  }, [mediaSize]);

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
          toast.error(t('error'));
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

  const cropSize = useMemo(() => {
    if (size && size.width < 320) {
      return size.width;
    }

    return CROP_SIZE;
  }, [size]);

  const initOptions = useMemo(() => {
    let initOpt: any = {
      cropShape: 'rect',
      objectFit: 'horizontal-cover',
      aspect: 16 / 9,
    };

    if (!cropCover) {
      initOpt = {
        cropShape: 'round',
        cropSize: {
          width: cropSize,
          height: cropSize,
        },
        style: {
          cropAreaStyle: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        },
        objectFit: 'vertical-cover',
        aspect: 1 / 1,
      };
    }

    return initOpt;
  }, [cropCover, cropSize]);

  const handleCropImage = async () => {
    try {
      if (!image || !croppedAreaPixels) {
        return;
      }

      setLoading(true);
      const blob = await getCroppedImg(
        image,
        croppedAreaPixels,
        cropCover ? croppedAreaPixels.width : AVATAR_SIZE.width,
        cropCover ? croppedAreaPixels.height : AVATAR_SIZE.height,
      );

      onSuccess && onSuccess(blob);
    } catch {
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const handleLoadedMedia = (mediaSize: MediaSize) => {
    const isHorizontalImage = mediaSize.naturalWidth > mediaSize.naturalHeight;
    const initZoom = CROP_SIZE / (isHorizontalImage ? mediaSize.height : mediaSize.width);
    setInitZoom(initZoom);
    setMediaSize(mediaSize);
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      closeIcon={<></>}
      destroyOnClose
      className={styles.modal}
    >
      <div className={styles.cropContainer} ref={containerRef}>
        {onCompressing ? (
          <div className='flex h-full items-center justify-center'>
            <Loading />
          </div>
        ) : (
          <Cropper
            crop={crop}
            onCropChange={(res) => {
              setCrop(res);

              if (mediaSize && !cropCover) {
                const isHorizontalImage = mediaSize.naturalWidth > mediaSize.naturalHeight;
                const initZoom =
                  cropSize / (isHorizontalImage ? mediaSize.height : mediaSize.width);
                setInitZoom(initZoom);
              }
            }}
            image={image}
            showGrid={false}
            zoom={cropCover ? 1 : zoom}
            onMediaLoaded={handleLoadedMedia}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
            {...initOptions}
            {...options}
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

export default ModalCropAvatarCover;
