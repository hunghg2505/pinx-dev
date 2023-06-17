import { useRequest } from 'ahooks';

import { API_PATH } from '@api/constant';
import { request } from '@api/request';

export interface ITrending {
  keyword: string;
  type: string;
  numberHit: number;
}
export interface IKOL {
  id: number;
  position: string;
  name: string;
  avatar: string;
  caption: string;
  isKol: boolean;
  hasSyncContact: boolean;
  state: any;
  fcmToken: any;
  kolPoint: number;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  isFeatureProfile: boolean;
}
const dataTrending = [
  {
    keyword: 'ssi',
    type: 'STOCK',
    numberHit: 30,
  },
  {
    keyword: 'vnm',
    type: 'STOCK',
    numberHit: 16,
  },
  {
    keyword: 'hah',
    type: 'ALL',
    numberHit: 9,
  },
  {
    keyword: 'Vnd',
    type: 'STOCK',
    numberHit: 7,
  },
  {
    keyword: 'shb',
    type: 'STOCK',
    numberHit: 6,
  },
];

// const KOL = [
//   {
//     id: 1316,
//     position: 'Diễn viên',
//     name: 'TỐNG THỊ NGA',
//     avatar: 'https://static.pinetree.com.vn/upload/pinex/kol/lanngoc-avatar.jpg',
//     caption:
//       'Ngọc thuộc team “Cô nàng độc lập”; và tự tin làm điều mình thích.\nNguyên tắc đầu tư: Chưa có xây dựng nguyên tắc đầu tư cố định, nhưng rất ham học hỏi.',
//     isKol: true,
//     hasSyncContact: false,
//     state: null,
//     fcmToken: null,
//     kolPoint: 99,
//     displayName: 'Ninh Dương Lan Ngọc',
//     createdAt: '2022-05-25T04:30:28.000+00:00',
//     updatedAt: null,
//     isFeatureProfile: false,
//     isFollowed: false,
//     totalFollowing: 6,
//     totalFollower: 1,
//     latestFollowers: [
//       {
//         idCustomer: 1321,
//         avatar: 'https://static.pinetree.com.vn/upload/images/pist/default-avatar/b_1.png',
//       },
//     ],
//     coverImage: 'https://static.pinetree.com.vn/upload/pinex/kol/lanngoc-cover.jpg',
//     fullDes:
//       'Ngọc thích nghệ thuật, cũng thích kinh doanh và đặc biệt là thích độc lập, tự chủ tài chính nên lựa chọn đầu tư chứng khoán cũng nằm trong kế hoạch kiếm tiền của Ngọc.\nNgọc vẫn đang là một F0 chứng khoán nhưng sẽ là một nhà đầu tư luôn có tinh thần học hỏi và chịu khó thu thập thông tin, lắng nghe từ “tiền bối”.\nNgọc nghĩ rằng, giống như việc trở thành một diễn viên như hiện nay, con đường đầu tư cũng cần tôi luyện. Các bạn đã vào đến đây để đọc thì Ngọc rất vui vì chặng đường này có các bạn và PineX đồng hành.',
//     open: null,
//     createdAtStr: '2022-05-25 11:30:28',
//   },
//   {
//     id: 1301,
//     position: 'Ca sĩ',
//     name: 'TỐNG THỊ NGA',
//     avatar: 'https://static.pinetree.com.vn/upload/pinex/kol/ducphuc-avatar.jpg',
//     caption:
//       'Mình không giàu như đồn đại, mà “biết tính toán” và “muốn tích lũy”.\nNgười truyền cảm hứng đầu tư: Bạn bè',
//     isKol: true,
//     hasSyncContact: false,
//     state: null,
//     fcmToken: null,
//     kolPoint: 98,
//     displayName: 'Đức Phúc',
//     createdAt: '2022-05-11T10:52:00.000+00:00',
//     updatedAt: null,
//     isFeatureProfile: false,
//     isFollowed: false,
//     totalFollowing: 2,
//     totalFollower: 3,
//     latestFollowers: [
//       {
//         idCustomer: 1316,
//         avatar: 'https://static.pinetree.com.vn/upload/pinex/kol/lanngoc-avatar.jpg',
//       },
//       {
//         idCustomer: 1300,
//         avatar:
//           'https://static.pinetree.com.vn/upload/images/pist/profile/220510102025357-74141.jpg',
//       },
//       {
//         idCustomer: 1321,
//         avatar: 'https://static.pinetree.com.vn/upload/images/pist/default-avatar/b_1.png',
//       },
//     ],
//     coverImage: 'https://static.pinetree.com.vn/upload/pinex/kol/ducphuc-cover.jpg',
//     fullDes:
//       'Trong nhóm chơi thân ở showbiz của mình có rất nhiều anh, chị và bạn đầu tư và cũng dành nhiều lời khuyên tài chính cho mình. Thay vì gửi tiết kiệm, những khoản tiền nhàn rỗi nên được dùng để đầu tư. Bạn bè mình đầu tư bất động sản trộm vía lắm, mình cũng có nghe theo. Gần đây, mình lựa chọn thêm kênh đầu tư chứng khoán.\nThật sự mình cũng không giỏi tài chính đâu, dân nghệ thuật mà. Nên mình lựa chọn bắt đầu với số vốn vừa đủ, coi như học từ đầu. Để hạn chế rủi ro, mình lựa chọn những doanh nghiệp cơ bản, tìm hiểu thông tin về họ trước khi quyết định mua bán.\nMình nghĩ rằng, hành trình đầu tư này sẽ có nhiều điều thú vị và đáng để chờ đợi trong thời gian tới.',
//     open: null,
//     createdAtStr: '2022-05-11 17:52:00',
//   },
// ];

export const useGetListFillter = () => {
  const { data } = useRequest(() => {
    return request.get(API_PATH.FILTER_LIST);
  });
  return {
    data,
  };
};
export const useGetListNewFeed = () => {
  const { data, run } = useRequest(
    (type: string) => {
      return request.get(API_PATH.NEWFEED_LIST + `?filterType=${type}`);
    },
    {
      manual: true,
    },
  );
  return {
    listNewFeed: data?.data?.list,
    run,
  };
};
export const useGetTrending = () => {
  // const {data} = useRequest(() => {
  //   // return request.get(API_PATH.)
  // })
  return {
    dataTrending,
  };
};

export const useGetInfluencer = () => {
  const { data } = useRequest(() => {
    return request.get(API_PATH.KOL);
  });
  return {
    KOL: data,
  };
};
