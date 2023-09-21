import { memo } from 'react';

import Upload from 'rc-upload';

export const UploadImage = memo(
  ({ themeActive, isUpdateActivities, onStart, beforeUpload }: any) => {
    if (themeActive || (!themeActive && isUpdateActivities)) {
      return <></>;
    }

    return (
      <>
        <Upload
          // accept='.png, .jpeg, .jpg, .webp'
          accept='.png, .jpeg, .jpg'
          onStart={onStart}
          beforeUpload={beforeUpload}
          customRequest={() => {}}
          className=''
        >
          <div className='flex h-[38px] w-[38px] items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9] galaxy-max:h-[32px] galaxy-max:w-[32px]'>
            <img
              loading='lazy'
              src='/static/icons/explore/iconImage.svg'
              alt=''
              className='w-[20px]'
            />
          </div>
        </Upload>
      </>
    );
  },
);
