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
  isFollowed: boolean;
}
export interface ILatestSubscribe {
  avatar: string;
  idCustomer: number;
}
export interface ITheme {
  code: string;
  name: string;
  url: string;
  bgImage: string;
  type: string;
  description: string;
  isSubsribed: boolean;
  totalSubscribe: number;
  stocks?: string[];
  latestSubscribe: ILatestSubscribe[];
}
export interface IStockIndex {
  accVol: any;
  cIndex: number;
  displayName: string;
  id: number;
  index: string;
  isBeforeTransactionTime: boolean;
  mc: string;
  oIndex: number;
  ot: string;
  status: string;
  time: string;
  value: number;
  vol: number;
}
export interface IWatchListItem {
  ceilPrice: number;
  change: number;
  changePercent: number;
  floorPrice: number;
  highPrice: number;
  id: string;
  isHnx30: boolean;
  isVn30: boolean;
  lastPrice: number;
  lastVolume: number;
  lowPrice: number;
  name: string;
  nameEn: string;
  refPrice: number;
  shortName: string;
  stockCode: string;
  stockExchange: string;
  last_price: string;
  cl: string;
  changePc: string;
  hp: number;
  lp: number;
  perChange: number;
  time?: string;
}
export interface INewFeed {
  children: any;
  customerId: number;
  id: string;
  isFollowing: boolean;
  isReport: boolean;
  isLike: boolean;
  likes: number[];
  reports: any;
  post: any;
  postId: string;
  postType: string;
  publishedAt: number;
  reactionScore: number;
  status: string;
  textSearch: string;
  timeString: string;
  totalChildren: number;
  totalLikes: number;
  totalReports: number;
  totalViews: number;
}
export enum TYPESEARCH {
  ALL = 'ALL',
  FRIEND = 'FRIEND',
  NEWS = 'NEWS',
  POST = 'POST',
  STOCK = 'STOCK',
}

export interface ISearch {
  keyword: string;
  searchType: string;
}
export interface IOptionsRequest {
  onSuccess?: (r: any) => void;
  onError?: (e: any) => void;
}
