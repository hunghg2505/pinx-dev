import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { WHITE_BACKGROUND_IMAGE } from 'src/constant';

interface CustomImageProps {
  alt: string;
  src: string;

  [x: string]: any;
}

const CustomImage = ({ alt, src: srcProp, ...props }: CustomImageProps) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    setSrc(srcProp);
  }, [srcProp]);

  const handleImageError = () => {
    setSrc(WHITE_BACKGROUND_IMAGE);
  };

  return <Image key={src} alt={alt} src={src} {...props} onError={handleImageError} />;
};

export default CustomImage;
