import { useMemo } from 'react';

import classNames from 'classnames';

import Text from '@components/UI/Text';

type TMeta = Array<{
  property?: string;
  content?: string;
}>;

export const Metatags = ({
  metaData,
  setMetaData,
}: {
  metaData?: TMeta;
  setMetaData: (v: any) => void;
}) => {
  const data = useMemo(() => {
    if (!metaData?.length) {
      return;
    }

    const url = metaData?.find((it) => it?.property === 'og:url')?.content;
    const imageUrl = metaData?.find((it) => it?.property === 'og:image')?.content;
    const title = metaData?.find((it) => it?.property === 'og:title')?.content;
    const description = metaData?.find((it) => it?.property === 'og:description')?.content;

    return {
      url,
      imageUrl,
      title,
      description,
    };
  }, [metaData]);

  if (!data) {
    return <></>;
  }

  const { url, imageUrl, title, description } = data;

  return (
    <>
      <div className='my-[12px] block h-[2px] w-full bg-[#EEF5F9]'></div>

      <div className='relative'>
        <div className='w-full overflow-hidden rounded-[9px] border-[1px] border-solid border-[#EBEBEB] bg-white'>
          {imageUrl && (
            <img
              src={imageUrl}
              alt=''
              className={classNames('h-[200px] w-full bg-[#ebebeb7c] object-cover', {
                '!object-contain': url?.includes('tiktok'),
              })}
            />
          )}

          <div className='bg-[#EBEBEB] p-[10px]'>
            {url && (
              <Text type='body-14-regular' color='neutral-4' className='text-1-line text-left'>
                {url}
              </Text>
            )}

            {title && (
              <Text type='body-16-medium' color='cbblack' className='my-[8px] text-left'>
                {title}
              </Text>
            )}

            {description && (
              <Text type='body-14-regular' color='neutral-4' className='text-1-line text-left'>
                {description}
              </Text>
            )}
          </div>
        </div>

        <img
          src='/static/icons/explore/iconClose.svg'
          alt=''
          className='absolute right-[10px] top-[10px] z-[2] h-[20px] w-[20px] cursor-pointer'
          onClick={() => setMetaData(undefined)}
        />
      </div>
    </>
  );
};
