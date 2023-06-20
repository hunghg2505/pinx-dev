import { useRequest } from 'ahooks';
import io from 'socket.io-client';

import { API_PATH } from '@api/constant';
import { privateRequest, requestComunity } from '@api/request';
import { FIXED_TOKEN } from '@components/Post/service';
import { ENV } from '@utils/env';

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
  coverImage: string;
  caption: string;
  isKol: boolean;
  isFollowed: boolean;
  hasSyncContact: boolean;
  state: any;
  fcmToken: any;
  kolPoint: number;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  isFeatureProfile: boolean;
  totalFollower: number;
  totalFollowing: number;
  latestFollowers: any;
  fullDes: string;
  open: any;
  createdAtStr: string;
}

export interface ISuggestionPeople {
  avatar: string;
  customerId: number;
  displayName: string;
  id: number;
  isFeatureProfile: boolean;
  isKol: boolean;
  name: string;
  numberFollowers: number;
}
export interface ITheme {
  code: string;
  name: string;
  url: string;
  bgImage: string;
  type: string;
  description: string;
  stocks: string[];
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
const theme: ITheme[] = [
  {
    code: 'T003',
    name: 'Nhà cửa và đời sống',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_home_garden.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T003.png',
    type: '3',
    description:
      'Tất cả chúng ta đều đang tìm kiếm một thế giới ấm cúng, yên bình của riêng mình.\nHãy cùng khám phá những doanh nghiệp cung ứng những dịch vụ, sản phẩm này!',
    stocks: [
      'RAL',
      'BFC',
      'SHI',
      'GDT',
      'NHT',
      'LIX',
      'BKG',
      'PTB',
      'SAV',
      'VCS',
      'HHP',
      'NSC',
      'DCM',
      'DDV',
      'DGC',
      'DPM',
      'VAF',
      'SHA',
      'AAS',
      'AAA',
      'AAB',
    ],
  },
  {
    code: 'T002',
    name: 'Khu công nghiệp',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_industry_park.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T002.png',
    type: 'A',
    description:
      'Cùng xem các khu công nghiệp đang vận hành trên toàn quốc có những đặc điểm nào nổi bật?\nChúng tôi đang liệt kê các doanh nghiệp đầu ngành trong lĩnh vực này',
    stocks: [
      'D2D',
      'DPR',
      'TIP',
      'UIC',
      'VGC',
      'IDV',
      'KBC',
      'LHG',
      'MH3',
      'NTC',
      'PHR',
      'SZC',
      'SZL',
    ],
  },
  {
    code: 'T001',
    name: 'Vật liệu xây dựng',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_building_materials.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T001.png',
    type: 'A',
    description:
      'Mọi nền tảng của phát triển đều bắt đầu từ những nguyên liệu thô. Pinetree đã lựa chọn ra những doanh nghiệp đầu ngành có sức cạnh tranh lớn trên thị trường. Hãy xem họ là ai?\n \n',
    stocks: [
      'C32',
      'BCC',
      'BTS',
      'CLH',
      'HT1',
      'QNC',
      'C69',
      'CTI',
      'DHA',
      'DL1',
      'DND',
      'KSB',
      'NNC',
      'VLB',
    ],
  },
  {
    code: 'T006',
    name: 'Sản phẩm gia dụng',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_household.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T006.png',
    type: 'A',
    description:
      'Bạn có thể nhận ra nhanh chóng những cái tên quen thuộc với nhiều gia đình. \nCùng xem những doanh nghiệp này hoạt động hiệu quả như nào.',
    stocks: [
      'AAA',
      'VOC',
      'TDP',
      'GIL',
      'GTN',
      'SAB',
      'TNA',
      'VNM',
      'MSN',
      'NAF',
      'QNS',
      'BNA',
      'DBC',
      'KDC',
      'LAF',
      'LSS',
      'OCH',
      'OGC',
      'PAN',
      'SBT',
      'TAR',
      'APH',
    ],
  },
  {
    code: 'T008',
    name: 'Năng lượng sạch',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_green_energy.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T008.png',
    type: 'A',
    description:
      'Ngày mai bắt đầu từ hôm nay. Tiết kiệm cho một điều kiện sống tươi sáng, đẹp đẽ. Xem ai đang tham gia cuộc cách mạng giảm khí CO2.',
    stocks: [
      'ASM',
      'VNE',
      'REE',
      'LCG',
      'HID',
      'FCN',
      'GEG',
      'TV2',
      'HJS',
      'IDC',
      'POW',
      'SDD',
      'VSH',
      'PC1',
      'HDG',
      'TTA',
      'SD5',
      'VE9',
      'BCG',
    ],
  },
  {
    code: 'T009',
    name: 'Sắt thép',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_steel.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T009.png',
    type: 'A',
    description:
      'Xương sống của hầu hết mọi ngành công nghiệp hiện đại là thép. Ai đang làm ra nó và tại sao bạn cần biết?',
    stocks: [
      'CBI',
      'TDS',
      'TIS',
      'TLH',
      'TNS',
      'TVN',
      'VCA',
      'VGS',
      'VIS',
      'DTL',
      'HMC',
      'HPG',
      'HSG',
      'KKC',
      'NKG',
      'POM',
      'SMC',
    ],
  },
  {
    code: 'T011',
    name: 'Thời trang',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_fashion_clothes.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T011.png',
    type: 'A',
    description:
      'Bạn yêu thích trang phục hàng ngày của mình? Cùng tìm hiểu những cái tên đứng sau cung cấp chất liệu làm ra những trang phục hàng ngày của bạn, một số trong số họ thậm chí còn là những nhà cung cấp đẳng cấp thế giới.',
    stocks: [
      'A32',
      'GMC',
      'HCB',
      'HDM',
      'HFS',
      'HKC',
      'HNI',
      'HPU',
      'HTG',
      'HUG',
      'LGM',
      'AG1',
      'M10',
      'MDN',
      'MGG',
      'MNB',
      'MSH',
      'NJC',
      'NTT',
      'PPH',
      'PTG',
      'TCM',
      'AQN',
      'TDT',
      'TET',
      'TNG',
      'TTG',
      'TTH',
      'TVT',
      'VDN',
      'VGG',
      'VGT',
      'VTI',
      'ATD',
      'X20',
      'X26',
      'BDG',
      'BMG',
      'DCG',
      'DM7',
      'GIL',
    ],
  },
  {
    code: 'T012',
    name: 'Giáo dục',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_education.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T012.png',
    type: 'A',
    description:
      'Giáo dục là một quá trình học tập, hoặc thu nhận kiến ​​thức, kỹ năng, giá trị, đạo đức hoặc niềm tin. Tất cả chúng ta đều biết tầm quan trọng của nó đối với thế hệ tương lai, vì vậy bạn không thể bỏ lỡ chủ đề này.',
    stocks: [
      'ADC',
      'EID',
      'EPH',
      'FHS',
      'HAB',
      'HBE',
      'HEV',
      'KBE',
      'LBE',
      'NBE',
      'PNC',
      'BDB',
      'QST',
      'SED',
      'SGD',
      'SMN',
      'STH',
      'TLG',
      'VNB',
      'VPR',
      'FPT',
      'VIC',
      'BED',
      'BST',
      'DAD',
      'DAE',
      'DST',
      'EBS',
      'ECI',
    ],
  },
  {
    code: 'T013',
    name: 'Xây dựng',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_construction.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T013.png',
    type: 'A',
    description:
      'Sự kết hợp giữa nghệ thuật và khoa học tạo ra tất cả các kiệt tác nghệ thuật hạ tầng, từ ngôi nhà của bạn đến các thành phố lớn hiện đại. Xem ai đang biến những viên gạch thành kiệt tác cơ sở hạ tầng cùng Pinetree!',
    stocks: [
      'CTD',
      'LCG',
      'PHC',
      'UIC',
      'SC5',
      'LIG',
      'DPG',
      'L18',
      'TCD',
      'LM8',
      'SD5',
      'HBC',
      'THG',
      'TA9',
      'SCI',
      'VC2',
      'S99',
      'SDT',
      'VMC',
      'VNE',
      'VC9',
      'CKG',
      'DTK',
      'C47',
      'VCG',
      'PC1',
      'ROS',
      'CII',
      'SHN',
      'FCN',
    ],
  },
  {
    code: 'T014',
    name: 'Năng lượng mặt trời',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_solar_power.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T014.png',
    type: 'A',
    description:
      'Giải pháp xanh hơn, rẻ hơn và đơn giản hơn để cung cấp năng lượng cho tương lai. Bạn có thể tận hưởng các thiết bị hiện đại với những nhà cung cấp giải pháp sáng tạo này.',
    stocks: [
      'ASM',
      'HID',
      'HUT',
      'LCG',
      'LIG',
      'PC1',
      'PGV',
      'REE',
      'SJE',
      'TTA',
      'TV2',
      'BCG',
      'CHP',
      'DNH',
      'FCN',
      'GEG',
      'GEX',
      'GHC',
      'HDG',
    ],
  },
  {
    code: 'T015',
    name: 'Đồ uống và nước giải khát',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_alcohol_beverage.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T015.png',
    type: 'A',
    description:
      'Các nhãn hiệu đồ uống quen thuộc với gia đình bạn. Các sản phẩm xuất hiệu hầu hết trong các sự kiện. \nBạn có biết ai là công ty sản xuất ra nó không?',
    stocks: [
      'BBM',
      'BSQ',
      'BTB',
      'FCC',
      'HAD',
      'HAT',
      'HBH',
      'HLB',
      'HNR',
      'SAB',
      'SB1',
      'BHK',
      'SBL',
      'SMB',
      'THB',
      'VCF',
      'VDL',
      'VHI',
      'WSB',
      'BHN',
      'BHP',
      'BQB',
      'BSD',
      'BSH',
      'BSL',
      'BSP',
    ],
  },
  {
    code: 'T016',
    name: 'Điện',
    url: 'https://static.pinetree.com.vn/upload/images/pist/theme/thm_electricity.png',
    bgImage: 'https://static.pinetree.com.vn/upload/pinex/theme/T016.png',
    type: 'A',
    description:
      'Bạn có bao giờ tự hỏi cuộc sống sẽ diễn ra như thế nào khi không có điện? Những công ty này đang cung cấp cho bạn một cuộc sống hiện đại.',
    stocks: [
      'BTP',
      'NCP',
      'NT2',
      'PGV',
      'POW',
      'PPC',
      'QTP',
      'SBH',
      'UIC',
      'CAV',
      'DQC',
      'CHP',
      'GEX',
      'RAL',
      'TBD',
      'THI',
      'TYA',
      'DTK',
      'LM8',
      'PC1',
      'SD5',
      'SJG',
      'DNA',
      'VNE',
      'DNH',
      'GEG',
      'HND',
      'IDC',
      'KHP',
      'NBP',
    ],
  },
];
const KOL: IKOL[] = [
  {
    id: 1316,
    position: 'Diễn viên',
    name: 'TỐNG THỊ NGA',
    avatar: 'https://static.pinetree.com.vn/upload/pinex/kol/lanngoc-avatar.jpg',
    caption:
      'Ngọc thuộc team “Cô nàng độc lập”; và tự tin làm điều mình thích.\nNguyên tắc đầu tư: Chưa có xây dựng nguyên tắc đầu tư cố định, nhưng rất ham học hỏi.',
    isKol: true,
    hasSyncContact: false,
    state: undefined,
    fcmToken: undefined,
    kolPoint: 99,
    displayName: 'Ninh Dương Lan Ngọc',
    createdAt: '2022-05-25T04:30:28.000+00:00',
    updatedAt: '',
    isFeatureProfile: false,
    isFollowed: false,
    totalFollowing: 6,
    totalFollower: 1,
    latestFollowers: [
      {
        idCustomer: 1321,
        avatar: 'https://static.pinetree.com.vn/upload/images/pist/default-avatar/b_1.png',
      },
    ],
    coverImage: 'https://static.pinetree.com.vn/upload/pinex/kol/lanngoc-cover.jpg',
    fullDes:
      'Ngọc thích nghệ thuật, cũng thích kinh doanh và đặc biệt là thích độc lập, tự chủ tài chính nên lựa chọn đầu tư chứng khoán cũng nằm trong kế hoạch kiếm tiền của Ngọc.\nNgọc vẫn đang là một F0 chứng khoán nhưng sẽ là một nhà đầu tư luôn có tinh thần học hỏi và chịu khó thu thập thông tin, lắng nghe từ “tiền bối”.\nNgọc nghĩ rằng, giống như việc trở thành một diễn viên như hiện nay, con đường đầu tư cũng cần tôi luyện. Các bạn đã vào đến đây để đọc thì Ngọc rất vui vì chặng đường này có các bạn và PineX đồng hành.',
    open: undefined,
    createdAtStr: '2022-05-25 11:30:28',
  },
  {
    id: 1301,
    position: 'Ca sĩ',
    name: 'TỐNG THỊ NGA',
    avatar: 'https://static.pinetree.com.vn/upload/pinex/kol/ducphuc-avatar.jpg',
    caption:
      'Mình không giàu như đồn đại, mà “biết tính toán” và “muốn tích lũy”.\nNgười truyền cảm hứng đầu tư: Bạn bè',
    isKol: true,
    hasSyncContact: false,
    state: undefined,
    fcmToken: undefined,
    kolPoint: 98,
    displayName: 'Đức Phúc',
    createdAt: '2022-05-11T10:52:00.000+00:00',
    updatedAt: '',
    isFeatureProfile: false,
    isFollowed: false,
    totalFollowing: 2,
    totalFollower: 3,
    latestFollowers: [
      {
        idCustomer: 1316,
        avatar: 'https://static.pinetree.com.vn/upload/pinex/kol/lanngoc-avatar.jpg',
      },
      {
        idCustomer: 1300,
        avatar:
          'https://static.pinetree.com.vn/upload/images/pist/profile/220510102025357-74141.jpg',
      },
      {
        idCustomer: 1321,
        avatar: 'https://static.pinetree.com.vn/upload/images/pist/default-avatar/b_1.png',
      },
    ],
    coverImage: 'https://static.pinetree.com.vn/upload/pinex/kol/ducphuc-cover.jpg',
    fullDes:
      'Trong nhóm chơi thân ở showbiz của mình có rất nhiều anh, chị và bạn đầu tư và cũng dành nhiều lời khuyên tài chính cho mình. Thay vì gửi tiết kiệm, những khoản tiền nhàn rỗi nên được dùng để đầu tư. Bạn bè mình đầu tư bất động sản trộm vía lắm, mình cũng có nghe theo. Gần đây, mình lựa chọn thêm kênh đầu tư chứng khoán.\nThật sự mình cũng không giỏi tài chính đâu, dân nghệ thuật mà. Nên mình lựa chọn bắt đầu với số vốn vừa đủ, coi như học từ đầu. Để hạn chế rủi ro, mình lựa chọn những doanh nghiệp cơ bản, tìm hiểu thông tin về họ trước khi quyết định mua bán.\nMình nghĩ rằng, hành trình đầu tư này sẽ có nhiều điều thú vị và đáng để chờ đợi trong thời gian tới.',
    open: undefined,
    createdAtStr: '2022-05-11 17:52:00',
  },
];

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
      return requestComunity.get(API_PATH.NEWFEED_LIST + `?filterType=${type}`);
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
  // const { data } = useRequest(() => {
  //   return request.get(API_PATH.KOL);
  // });
  return {
    KOL,
  };
};
export const socket = io(ENV.URL_SOCKET, {
  transports: ['websocket'],
});
export const requestJoinChannel = (stocks: string) => {
  const message = { action: 'join', data: stocks };
  socket.emit('regs', JSON.stringify(message));
};
export const requestLeaveChannel = (stocks: string) => {
  console.log('handle leave', stocks);
  const message = { action: 'leave', data: stocks };
  if (socket) {
    socket.emit('regs', JSON.stringify(message));
  }
};
export const requestJoinIndex = () => {
  const message = { action: 'join', data: 'index' };
  socket.emit('regs', JSON.stringify(message));
};
export const requestLeaveIndex = () => {
  const message = { action: 'leave', data: 'index' };
  socket.emit('regs', JSON.stringify(message));
};

export const useSuggestPeople = () => {
  const { data } = useRequest(() => {
    return privateRequest(requestComunity.get, API_PATH.SUGGESTION_PEOPLE, {
      headers: {
        Authorization: FIXED_TOKEN,
      },
    });
  });
  return {
    suggestionPeople: data?.list,
  };
};

export const useGetTheme = () => {
  return {
    theme,
  };
};
