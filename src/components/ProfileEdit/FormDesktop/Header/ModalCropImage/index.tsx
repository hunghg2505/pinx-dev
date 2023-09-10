import React, { useMemo, useRef } from 'react';

import { useTranslation } from 'next-i18next';
// eslint-disable-next-line import/named
import { Cropper, ReactCropperElement } from 'react-cropper';

import { MainButton } from '@components/UI/Button';
import Modal from '@components/UI/Modal/Modal';
import Text from '@components/UI/Text';

interface ModalCropImageProps {
  visible: boolean;
  onClose: () => void;
  file?: File;
  cropperOptions?: any;
  width: number;
  height: number;
  onCropSuccess: (blob: Blob | null) => void;
}

const ModalCropImage = (props: ModalCropImageProps) => {
  const { visible, onClose, file, cropperOptions, width, height, onCropSuccess } = props;
  const { t } = useTranslation();
  const cropperRef = useRef<ReactCropperElement>(null);

  const url = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
  }, [file]);

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
    <Modal visible={visible} onClose={onClose}>
      <Cropper
        ref={cropperRef}
        src={url}
        background={false}
        aspectRatio={cropperOptions?.aspectRatio || 16 / 9}
        viewMode={cropperOptions?.viewMode || 1}
        style={{ marginTop: '24px' }}
        {...cropperOptions}
      />

      <div className='text-center'>
        <MainButton
          className='mx-auto mt-[24px] h-[38px] !py-0 px-[32px]'
          onClick={handleCropImage}
        >
          <Text type='body-14-medium'>{t('save')}</Text>
        </MainButton>
      </div>
    </Modal>
  );
};

export default ModalCropImage;
