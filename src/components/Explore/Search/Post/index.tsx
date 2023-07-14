// import classNames from 'classnames';

import { IPost } from '@components/Post/service';

// import { IPost, TYPEPOST } from '@components/Post/service';
// import Text from '@components/UI/Text';

interface IProps {
  postDetail: IPost;
}
const Post = (props: IProps) => {
  const { postDetail } = props;
  console.log('🚀 ~ file: index.tsx:11 ~ Post ~ postDetail:', postDetail);
  // const renderLogo = () => {
  //   let logo = '';
  //   if (
  //     [
  //       TYPEPOST.PinetreeDailyNews,
  //       TYPEPOST.PinetreeMarketBrief,
  //       TYPEPOST.PinetreeMorningBrief,
  //       TYPEPOST.PinetreePost,
  //       TYPEPOST.PinetreeWeeklyNews,
  //     ].includes(postDetail?.post.postType)
  //   ) {
  //     logo = '/static/logo/logoPintree.png';
  //   }
  //   if ([TYPEPOST.TNCKNews].includes(postDetail?.post?.postType)) {
  //     logo = 'https://static.pinetree.com.vn/upload/vendor_tnck_logo.png';
  //   }
  //   if (
  //     [
  //       TYPEPOST.POST,
  //       TYPEPOST.ActivityTheme,
  //       TYPEPOST.ActivityWatchlist,
  //       TYPEPOST.ActivityMatchOrder,
  //     ].includes(postDetail?.post.postType)
  //   ) {
  //     logo = postDetail?.post?.customerInfo?.avatar;
  //   }
  //   if (
  //     [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
  //       postDetail?.post.postType,
  //     )
  //   ) {
  //     logo = 'https://static.pinetree.com.vn/upload/vendor_vietstock_logo.png';
  //   }
  //   if ([TYPEPOST.CafeFNews].includes(postDetail?.post.postType)) {
  //     logo = '/static/logo/logoCafeF.png';
  //   }
  //   return logo;
  // };
  // const renderDisplayName = () => {
  //   let name = '';
  //   if (
  //     [
  //       TYPEPOST.PinetreeDailyNews,
  //       TYPEPOST.PinetreeMarketBrief,
  //       TYPEPOST.PinetreeMorningBrief,
  //       TYPEPOST.PinetreePost,
  //       TYPEPOST.PinetreeWeeklyNews,
  //     ].includes(postDetail?.post.postType)
  //   ) {
  //     name = 'Pinetree';
  //   }
  //   if (
  //     [
  //       TYPEPOST.POST,
  //       TYPEPOST.ActivityTheme,
  //       TYPEPOST.ActivityWatchlist,
  //       TYPEPOST.ActivityMatchOrder,
  //     ].includes(postDetail?.post.postType)
  //   ) {
  //     name = postDetail?.post?.customerInfo?.displayName;
  //   }
  //   if (
  //     [TYPEPOST.VietstockLatestNews, TYPEPOST.VietstockNews, TYPEPOST.VietstockStockNews].includes(
  //       postDetail?.post.postType,
  //     )
  //   ) {
  //     name = 'Vietstock';
  //   }
  //   if ([TYPEPOST.CafeFNews].includes(postDetail?.post.postType)) {
  //     name = 'CafeF';
  //   }
  //   if ([TYPEPOST.TNCKNews].includes(postDetail?.post.postType)) {
  //     name = 'TNCKNews';
  //   }
  //   return name;
  // };
  // const renderContentPost = () => {
  //   if (id) {
  //     return <ContentPostTypeDetail onNavigate={onNavigate} postDetail={postDetail} />;
  //   }
  //   return <ContentPostTypeHome onNavigate={onNavigate} postDetail={postDetail} />;
  // };
  // const renderTextFollow = () => {
  //   if (postDetail?.isFollowing) {
  //     return (
  //       <>
  //         <div
  //           className={classNames(
  //             'mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px] bg-[#EAF4FB] mobile:hidden tablet:flex ',
  //             { 'bg-[#F3F2F6]': postDetail?.isFollowing },
  //           )}
  //         >
  //           <Text type='body-14-bold' color='neutral-5' className='ml-[5px]'>
  //             Following
  //           </Text>
  //         </div>

  //         <img
  //           src='/static/icons/iconUserFollow.svg'
  //           alt=''
  //           width={0}
  //           height={0}
  //           className='w-[24px] mobile:block tablet:hidden'
  //           sizes='100vw'
  //         />
  //       </>
  //     );
  //   }
  //   return (
  //     <>
  //       {!isMyPost && (
  //         <>
  //           <div
  //             className={classNames(
  //               'mr-[10px] flex h-[36px] w-[89px] flex-row items-center justify-center rounded-[5px] bg-[#EAF4FB] mobile:hidden tablet:flex ',
  //               { 'bg-[#F3F2F6]': postDetail?.isFollowing },
  //             )}
  //           >
  //             <IconPlus />
  //             <Text type='body-14-bold' color='primary-2' className='ml-[5px]'>
  //               Follow
  //             </Text>
  //           </div>

  //           <img
  //             src='/static/icons/iconUserUnFollow.svg'
  //             alt=''
  //             width={0}
  //             height={0}
  //             className='w-[24px] mobile:block tablet:hidden'
  //             sizes='100vw'
  //           />
  //         </>
  //       )}
  //     </>
  //   );
  // };
  return (
    <>
      <div className='rounded-[12px] bg-[#FFF] p-[16px] [border-bottom:1px_solid_##EEF5F9] [border-top:1px_solid_##EEF5F9] [box-shadow:0px_9px_28px_8px_rgba(0,_0,_0,_0.05),_0px_6px_16px_0px_rgba(0,_0,_0,_0.08),_0px_3px_6px_-4px_rgba(0,_0,_0,_0.12)]'>
        123
      </div>
    </>
  );
};
export default Post;
