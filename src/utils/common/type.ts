// convert image to jpg
export enum CONVERT_IMAGE_ERR_MSG {
  FILE_INVALID = 'FILE_INVALID',
  ERROR = 'ERROR',
}

export interface compressImageParams {
  file: File | Blob;
  targetQuality?: number;
  maxFileSizeKB: number;
  onSuccess: (file: File | Blob) => Promise<void>;
  onCompressStart?: () => void;
  onError?: (message: any) => void;
  compressorOpt?: any;
}

export interface CompressImageParams {
  file: File;
  maxFileSizeKb?: number;
  quality?: number;
  options?: any;
  maxWidthOrHeight?: number;
}
