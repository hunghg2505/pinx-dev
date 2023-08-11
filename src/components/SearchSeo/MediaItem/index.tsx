import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import styles from '@components/SearchSeo/index.module.scss';
import Text from '@components/UI/Text';
import getSeoDataFromLink, { ROUTE_PATH } from '@utils/common';

const MediaItem = ({ data, type }: { data: any, type?: string }) => {
  const [img, setImg] = React.useState('');

  const router = useRouter();
  React.useEffect(() => {
    getSeoDataFromLink(data?.post?.metadataList[0]?.url).then((res) => {
      console.log('res',res);
      console.log('img',res[2]?.content);
      setImg(res[2]?.content);
    });
  },[img]);
  console.log('getSeoDataFromLink',img);

  const onGoToDetail = () => {
    router.push(ROUTE_PATH.POST_DETAIL(data?.id));
  };

  const renderTypeMedia = (param: string) => {
    switch(param) {
      case 'TikTok': {
        return (
          <div className={classNames('relative',styles.Video)}>
            <img
              className='aspect-[345/162] object-contain bg-[#12121239] rounded'
              src={img || '/static/images/noimage.jpg'}
              alt="Picture of TikTok"
              width={345}
              height={162}
            />
          </div>
        );
      }
      case 'YouTube': {
        return (
          <div className={classNames('relative',styles.Video)}>
            <img
              className='aspect-[345/162] object-contain bg-[#12121239] rounded'
              src={data?.post?.metadataList[0]?.images[0] || '/static/images/noimage.jpg'}
              alt="Picture of Youtube"
              width={345}
              height={162}
            />
          </div>
        );
      }
      default: {
        return (
          <>
            <div className={classNames('relative',styles.Video)}>
              <img
                className='aspect-[345/162] object-contain bg-[#12121239] rounded'
                src={data?.post?.metadataList[0]?.images[0] || '/static/images/noimage.jpg'}
                alt="Picture of Orther"
                width={345}
                height={162}
              />
            </div>
          </>
        );
      }
    }
  };
  return (
    <div className='flex flex-col gap-y-[8px] cursor-pointer' onClick={onGoToDetail}>
      {type ? (
        <img
          className='aspect-[345/162] object-contain bg-[#12121239] rounded'
          src={data?.post?.seoMetadata?.imageSeo?.urlImage || '/static/images/noimage.jpg'}
          alt="Picture of the author"
          width={345}
          height={162}
        />
      ):(
        renderTypeMedia(data?.post?.metadataList[0]?.siteName)
      )}
      <Text type='body-14-semibold' className='text-[#0D0D0D]'>{data?.post?.seoMetadata?.title || data?.post?.metadataList[0]?.title}</Text>
    </div>
  );
};
export default MediaItem;
