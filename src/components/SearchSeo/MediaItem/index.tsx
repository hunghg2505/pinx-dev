import React from 'react';

import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '@components/SearchSeo/index.module.scss';
import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import getSeoDataFromLink, { ROUTE_PATH, formatMessage } from '@utils/common';

// const formatMessages = (message: string, data: any, idCustomer?: any) => {
//   const str = message.split(' ');
//   message = message.replaceAll('\n', '<p></p>');
//   const tagPeople = data?.tagPeople?.map((item: any) => {
//     return `@[${item?.displayName}](${item?.customerId})`;
//   });
//   const listStock = data?.tagStocks?.map((item: string) => {
//     return `%[${item}](${item})`;
//   });
//   const listHashTag = data?.hashtags?.map((item: any) => {
//     return item;
//   });
//   if (tagPeople) {
//     for (const item of tagPeople) {
//       const start = item.indexOf('[') + 1;
//       const end = item.indexOf(']');
//       const name = item.slice(start, end);
//       const startId = item.indexOf('(') + 1;
//       const endId = item.indexOf(')');
//       const ID = item.slice(startId, endId);
//       const url =
//         Number(idCustomer) === Number(ID)
//           ? `${window.location.origin}/profile/my-profile`
//           : `${window.location.origin}/profile/${ID}`;
//       if (message && !message.includes(name)) {
//         const newMessage = message.split(' ');
//         for (const text of newMessage) {
//           if (text.includes(ID)) {
//             const startName = text.indexOf('@[') + 2;
//             const endName = text.indexOf(']');
//             const nameOld = text.slice(startName, endName);
//             message = message.replace(
//               `@[${nameOld}](${ID})`,
//               `
//               <a href="${url}" className="tagStock tagpeople" data-type="userMention"><span>${name}</span></a>
//               `,
//             );
//           }
//         }
//       }
//       if (message && message.includes(name)) {
//         message = message.replace(
//           item,
//           `
//           <a href="${url}" className="tagStock tagpeople"><span>${name}</span></a>
//           `,
//         );
//       }
//     }
//   }
//   if (listStock) {
//     for (const item of listStock) {
//       const start = item.indexOf('[') + 1;
//       const end = item.indexOf(']');
//       const name = item.slice(start, end);
//       if (message && message.includes(item)) {
//         message = message.replaceAll(
//           item,
//           `
//           <a href="${window.location.origin}/stock/${name}" className="tagStock">${name}</a>
//           `,
//         );
//       }
//     }
//   }
//   if (listHashTag) {
//     for (const item of listHashTag) {
//       if (message && message.includes(item)) {
//         // const newItem = item.replace('#', '');
//         message = message.replaceAll(
//           item,
//           `
//           ${item}
//           `,
//         );
//       }
//     }
//   }
//   // eslint-disable-next-line array-callback-return
//   str?.map((item) => {
//     // if (item.includes('#')) {
//     //   // const newItem = item.replace('#', '');
//     //   message = message.replaceAll(
//     //     item,
//     //     `
//     //     <a href="javascript:void(0)" class="hashtag">${item}</a>
//     //     `,
//     //   );
//     // }
//     if (item.includes('http') && !item.includes('\n')) {
//       message = message.replaceAll(
//         item,
//         `
//         ${item}
//         `,
//       );
//     }
//     if (item.includes('http') && item.includes('\n')) {
//       const newItem = item?.split('\n');
//       for (const item of newItem) {
//         if (item.includes('http')) {
//           message = message.replaceAll(
//             item,
//             `
//             ${item}
//             `,
//           );
//         }
//       }
//     }
//     // }
//   });
//   return message;
// };

const MediaItem = ({
  data,
  setShowPopup,
  onTrackingViewTicker,
}: {
  data: any;
  type?: string;
  setShowPopup?: any;
  onTrackingViewTicker?: (stockCode: string) => void;
}) => {
  const { userLoginInfo } = useUserLoginInfo();
  const [img, setImg] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();
  React.useEffect(() => {
    getSeoDataFromLink(data?.post?.metadataList?.[0]?.url).then((res) => {
      setImg(res?.[2]?.content);
      setLoading(false);
    });
  }, [img]);

  const onGoToDetail = () => {
    onNavigate(ROUTE_PATH.POST_DETAIL(data?.seoMetadata.slug));
  };

  const onNavigate = (path: string) => {
    router.push(path);
    setShowPopup && setShowPopup(false);
  };

  const onHandleClick = (e: any) => {
    const textContent = e?.target?.textContent as string;
    const classElement = e?.target?.className;
    const id = e?.target?.id;
    if (classElement === 'link') {
      return window.open(textContent);
    }
    if (classElement === 'people') {
      const url =
        Number(userLoginInfo?.id) === Number(id)
          ? ROUTE_PATH.MY_PROFILE
          : ROUTE_PATH.PROFILE_DETAIL(id);
      return onNavigate(url);
    }
    if (classElement === 'tagStock') {
      onTrackingViewTicker && onTrackingViewTicker(textContent);
      return onNavigate(ROUTE_PATH.STOCK_DETAIL(textContent));
    }
    if (classElement === 'hashtag') {
      const text = textContent.slice(1);
      return onNavigate(`${ROUTE_PATH.SEARCHSEO}?keyword=${text}`);
    }
    return onGoToDetail();
  };

  const renderTypeMedia = (param: string) => {
    switch (param) {
      case 'TikTok': {
        return (
          <div className='flex cursor-pointer flex-col gap-y-[8px]'>
            <div
              className={classNames('relative', styles.Video, styles.Tiktok)}
              onClick={onGoToDetail}
            >
              {loading ? (
                <Skeleton className='!h-[195px] !w-[345px]' />
              ) : (
                <Image
                  sizes='100vw'
                  className='aspect-[16/9] rounded bg-[#eee] object-contain'
                  src={img || '/static/images/noimage.jpg'}
                  alt='Picture of TikTok'
                  width={345}
                  height={162}
                />
              )}
            </div>
            <div onClick={(e: any) => onHandleClick(e)}>
              <Text type='body-14-semibold' className='messageFormat2 line-clamp-2 text-[#0D0D0D]'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(
                      data?.seoMetadata?.title || data?.post?.metadataList[0]?.title,
                    ),
                  }}
                ></div>
              </Text>
            </div>
          </div>
        );
      }
      case 'YouTube': {
        return (
          <div className='flex cursor-pointer flex-col gap-y-[8px]'>
            <div className={classNames('relative', styles.Youtube)} onClick={onGoToDetail}>
              {loading ? (
                <Skeleton className='!h-[195px] !w-[345px]' />
              ) : (
                <Image
                  sizes='100vw'
                  className='aspect-[16/9] rounded bg-[#eee] object-cover'
                  src={data?.post?.metadataList[0]?.images[0] || '/static/images/noimage.jpg'}
                  alt='Picture of Youtube'
                  width={345}
                  height={162}
                />
              )}
            </div>
            <div onClick={(e: any) => onHandleClick(e)}>
              <Text type='body-14-semibold' className='messageFormat2 line-clamp-2 text-[#0D0D0D]'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(
                      data?.seoMetadata?.title || data?.post?.metadataList[0]?.title,
                    ),
                  }}
                ></div>
              </Text>
            </div>
          </div>
        );
      }
      default: {
        return (
          <div className='flex cursor-pointer flex-col gap-y-[8px]'>
            <div className={classNames('relative')} onClick={onGoToDetail}>
              {loading ? (
                <Skeleton className='!h-[195px] !w-[345px]' />
              ) : (
                <Image
                  sizes='100vw'
                  className='aspect-[16/9] rounded bg-[#eee] object-contain'
                  src={data?.post?.metadataList[0]?.images[0] || '/static/images/noimage.jpg'}
                  alt='Picture of TikTok'
                  width={345}
                  height={162}
                />
              )}
            </div>
            <div onClick={(e: any) => onHandleClick(e)}>
              <Text type='body-14-semibold' className='messageFormat2 line-clamp-2 text-[#0D0D0D]'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMessage(
                      data?.seoMetadata?.title || data?.post?.metadataList[0]?.title,
                    ),
                  }}
                ></div>
              </Text>
            </div>
          </div>
        );
      }
    }
  };

  if (data?.seoMetadata?.imageSeo?.urlImage) {
    return (
      <div className='flex cursor-pointer flex-col gap-y-[8px]'>
        {loading ? (
          <Skeleton className='!h-[195px] !w-[345px]' />
        ) : (
          <Image
            sizes='100vw'
            className={classNames('aspect-[16/9] rounded bg-[#eee] object-cover', {
              '!object-contain': data?.seoMetadata?.imageSeo?.urlImage,
              '!object-cover': !data?.seoMetadata?.imageSeo?.urlImage,
            })}
            src={data?.seoMetadata?.imageSeo?.urlImage || '/static/images/noimage.jpg'}
            alt='Picture of the author'
            width={345}
            height={162}
            onClick={onGoToDetail}
          />
        )}
        <div onClick={(e: any) => onHandleClick(e)}>
          <Text type='body-14-semibold' className='messageFormat2 line-clamp-2 text-[#0D0D0D]'>
            <div
              dangerouslySetInnerHTML={{
                __html: formatMessage(
                  data?.seoMetadata?.title || data?.post?.metadataList[0]?.title,
                ),
              }}
            ></div>
          </Text>
        </div>
      </div>
    );
  }

  return (
    data?.post?.metadataList?.[0]?.siteName && (
      <>{renderTypeMedia(data?.post?.metadataList[0]?.siteName)}</>
    )
  );
};
export default MediaItem;
