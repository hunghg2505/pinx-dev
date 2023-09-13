import React, { useState } from 'react';

import Image from 'next/image';

import { WHITE_BACKGROUND_IMAGE } from 'src/constant';

interface CustomImageProps {
  alt: string;
  src: string;

  [x: string]: any;
}

const CustomImage = ({ alt, src, ...props }: CustomImageProps) => {
  const [isError, setIsError] = useState(false);

  const handleImageError = () => {
    setIsError(true);
  };

  return (
    <Image
      src={isError ? WHITE_BACKGROUND_IMAGE : src}
      alt={alt}
      {...props}
      onError={handleImageError}
    />
  );
};

export default CustomImage;
