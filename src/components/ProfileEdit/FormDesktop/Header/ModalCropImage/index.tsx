import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/named
import { Cropper, ReactCropperElement } from 'react-cropper';

import { MainButton, SemiMainButton } from '@components/UI/Button';
import Modal from '@components/UI/Modal/Modal';
import RangeSlider from '@components/UI/RangeSlider';
import Text from '@components/UI/Text';

interface ModalCropImageProps {
  visible: boolean;
  onClose: () => void;
  file?: File;
  cropperOptions?: any;
  width: number;
  height: number;
  onCropSuccess: (blob: Blob | null) => void;
  showZoomControl?: boolean;
}

const STEP_CHANGE = 5;
const ModalCropImage = (props: ModalCropImageProps) => {
  const { visible, onClose, file, cropperOptions, width, height, onCropSuccess, showZoomControl } =
    props;
  const { t } = useTranslation();
  const cropperRef = useRef<ReactCropperElement>(null);
  const [closeable, setCloseable] = useState(true);
  const [valueRangeSlider, setValueRangeSlider] = useState(0);
  const preValueRangeSliderRef = useRef(0);

  useEffect(() => {
    if (visible) {
      document.body.classList.add('overflow-y-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-y-hidden');
      preValueRangeSliderRef.current = 0;
    };
  }, [visible]);

  const url = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
  }, [file]);

  useEffect(() => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper?.getCanvasData().width) {
      return;
    }

    const isChange = preValueRangeSliderRef.current !== valueRangeSlider;
    const stepZoom = 0.1;
    const zoom = ((valueRangeSlider - preValueRangeSliderRef.current) / STEP_CHANGE) * stepZoom;

    if (isChange) {
      cropper.zoom(zoom);
    }

    preValueRangeSliderRef.current = valueRangeSlider;
  }, [valueRangeSlider, cropperRef]);

  const handleCropImage = () => {
    const cropper = cropperRef.current?.cropper;

    cropper
      ?.getCroppedCanvas({
        width,
        height,
      })
      .toBlob(onCropSuccess);
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      closeIcon={<></>}
      destroyOnClose
      maskClosable={closeable}
    >
      <Cropper
        ref={cropperRef}
        src={url}
        background={false}
        aspectRatio={cropperOptions?.aspectRatio || 16 / 9}
        viewMode={cropperOptions?.viewMode || 1}
        style={{ marginTop: '24px', maxHeight: 400 }}
        {...cropperOptions}
        cropmove={() => setCloseable(false)}
        cropend={() => setCloseable(true)}
        draggable={false}
      />

      {showZoomControl && (
        <RangeSlider
          className='mt-[12px]'
          stepChange={STEP_CHANGE}
          onChange={(val) => setValueRangeSlider(val)}
        />
      )}

      <div className='mt-[24px] flex items-center justify-center gap-x-[12px] text-center'>
        <SemiMainButton className='mx-auto h-[38px] !py-0 px-[32px]' onClick={onClose}>
          <Text type='body-14-medium'>{t('cancel')}</Text>
        </SemiMainButton>

        <MainButton className='mx-auto h-[38px] !py-0 px-[32px]' onClick={handleCropImage}>
          <Text type='body-14-medium'>{t('save')}</Text>
        </MainButton>
      </div>
    </Modal>
  );
};

export default ModalCropImage;
