import React from 'react';

import classNames from 'classnames';
import { useRouter } from 'next/router';

import styles from '@components/SearchSeo/index.module.scss';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import getSeoDataFromLink, { ROUTE_PATH } from '@utils/common';

const formatMessages = (message: string, data: any, idCustomer?: any) => {
  const str = message.split(' ');
  message = message.replaceAll('\n', '<p></p>');
  const tagPeople = data?.tagPeople?.map((item: any) => {
    return `@[${item?.displayName}](${item?.customerId})`;
  });
  const listStock = data?.tagStocks?.map((item: string) => {
    return `%[${item}](${item})`;
  });
  const listHashTag = data?.hashtags?.map((item: any) => {
    return item;
  });
  if (tagPeople) {
    for (const item of tagPeople) {
      const start = item.indexOf('[') + 1;
      const end = item.indexOf(']');
      const name = item.slice(start, end);
      const startId = item.indexOf('(') + 1;
      const endId = item.indexOf(')');
      const ID = item.slice(startId, endId);
      const url =
        Number(idCustomer) === Number(ID)
          ? `${window.location.origin}/profile/my-profile`
          : `${window.location.origin}/profile/${ID}`;
      if (message && !message.includes(name)) {
        const newMessage = message.split(' ');
        for (const text of newMessage) {
          if (text.includes(ID)) {
            const startName = text.indexOf('@[') + 2;
            const endName = text.indexOf(']');
            const nameOld = text.slice(startName, endName);
            message = message.replace(
              `@[${nameOld}](${ID})`,
              `
              <a href="${url}" className="tagStock tagpeople" data-type="userMention"><span>${name}</span></a>
              `,
            );
          }
        }
      }
      if (message && message.includes(name)) {
        message = message.replace(
          item,
          `
          <a href="${url}" className="tagStock tagpeople"><span>${name}</span></a>
          `,
        );
      }
    }
  }
  if (listStock) {
    for (const item of listStock) {
      const start = item.indexOf('[') + 1;
      const end = item.indexOf(']');
      const name = item.slice(start, end);
      if (message && message.includes(item)) {
        message = message.replaceAll(
          item,
          `
          <a href="${window.location.origin}/stock/${name}" className="tagStock">${name}</a>
          `,
        );
      }
    }
  }
  if (listHashTag) {
    for (const item of listHashTag) {
      if (message && message.includes(item)) {
        // const newItem = item.replace('#', '');
        message = message.replaceAll(
          item,
          `
          ${item}
          `,
        );
      }
    }
  }
  // eslint-disable-next-line array-callback-return
  str?.map((item) => {
    // if (item.includes('#')) {
    //   // const newItem = item.replace('#', '');
    //   message = message.replaceAll(
    //     item,
    //     `
    //     <a href="javascript:void(0)" class="hashtag">${item}</a>
    //     `,
    //   );
    // }
    if (item.includes('http') && !item.includes('\n')) {
      message = message.replaceAll(
        item,
        `
        ${item}
        `,
      );
    }
    if (item.includes('http') && item.includes('\n')) {
      const newItem = item?.split('\n');
      for (const item of newItem) {
        if (item.includes('http')) {
          message = message.replaceAll(
            item,
            `
            ${item}
            `,
          );
        }
      }
    }
    // }
  });
  return message;
};

const MediaItem = ({ data, type }: { data: any, type?: string }) => {
  const { userLoginInfo } = useUserLoginInfo();
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
          <>
            {img && (
              <div className='flex flex-col gap-y-[8px] cursor-pointer' onClick={onGoToDetail}>
                <div className={classNames('relative', styles.Video, styles.Tiktok)}>
                  <img
                    className='aspect-[16/9] object-contain bg-[#12121239] rounded'
                    src={img || '/static/images/noimage.jpg'}
                    alt="Picture of TikTok"
                    width={345}
                    height={162}
                  />
                </div>
                <Text
                  type='body-14-semibold' className='text-[#0D0D0D] line-clamp-2 messageFormat'
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: formatMessages(data?.post?.seoMetadata?.title || data?.post?.metadataList[0]?.title, data?.post, userLoginInfo?.id) }}
                  >
                  </div>
                </Text>
              </div>
            )}
          </>
        );
      }
      case 'YouTube': {
        return (
          <>
            {data?.post?.metadataList[0]?.images[0] && (
              <div className='flex flex-col gap-y-[8px] cursor-pointer' onClick={onGoToDetail}>
                <div className={classNames('relative', styles.Youtube)}>
                  <img
                    className='aspect-[16/9] object-cover bg-[#12121239] rounded'
                    src={data?.post?.metadataList[0]?.images[0] || '/static/images/noimage.jpg'}
                    alt="Picture of Youtube"
                    width={345}
                    height={162}
                  />
                </div>
                <Text
                  type='body-14-semibold' className='text-[#0D0D0D] line-clamp-2 messageFormat'
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: formatMessages(data?.post?.seoMetadata?.title || data?.post?.metadataList[0]?.title, data?.post, userLoginInfo?.id) }}
                  >
                  </div>
                </Text>
              </div>
            )}
          </>
        );
      }
      default: {
        return (
          <>
            {data?.post?.metadataList[0]?.images[0] && (
              <div className='flex flex-col gap-y-[8px] cursor-pointer' onClick={onGoToDetail}>
                <div className={classNames('relative',styles.Video)}>
                  <img
                    className={classNames('aspect-[16/9] bg-[#12121239] rounded',{
                      'object-cover': data?.post?.metadataList[0]?.images[0],
                      'object-cover ': !data?.post?.metadataList[0]?.images[0],
                    })}
                    src={data?.post?.metadataList[0]?.images[0] || '/static/images/noimage.jpg'}
                    alt="Picture of Orther"
                    width={345}
                    height={162}
                  />
                </div>
                <Text
                  type='body-14-semibold' className='text-[#0D0D0D] line-clamp-2 messageFormat'
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: formatMessages(data?.post?.seoMetadata?.title || data?.post?.metadataList[0]?.title, data?.post, userLoginInfo?.id) }}
                  >
                  </div>
                </Text>
              </div>
            )}
          </>
        );
      }
    }
  };
  return (
    <>
      {type ? (
        <>
          {data?.post?.seoMetadata?.imageSeo?.urlImage && (
            <div className='flex flex-col gap-y-[8px] cursor-pointer' onClick={onGoToDetail}>
              <img
                className={classNames('aspect-[16/9] bg-[#12121239] rounded',{
                  'object-contain': data?.post?.seoMetadata?.imageSeo?.urlImage,
                  'object-cover': !data?.post?.seoMetadata?.imageSeo?.urlImage,
                })}
                src={data?.post?.seoMetadata?.imageSeo?.urlImage || '/static/images/noimage.jpg'}
                alt="Picture of the author"
                width={345}
                height={162}
              />
              <Text
                type='body-14-semibold' className='text-[#0D0D0D] line-clamp-2 messageFormat'
              >
                <div
                  dangerouslySetInnerHTML={{ __html: formatMessages(data?.post?.seoMetadata?.title || data?.post?.metadataList[0]?.title, data?.post, userLoginInfo?.id) }}
                >
                </div>
              </Text>
            </div>
          )}
        </>
      ):(
        <>{renderTypeMedia(data?.post?.metadataList[0]?.siteName)}</>
      )}
    </>
  );
};
export default MediaItem;
