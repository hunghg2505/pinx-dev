export interface ICustomerInfo {
  id: number;
  customerId: number;
  name: string;
  displayName: string;
  avatar: string;
  numberFollowers: number;
  isKol: boolean;
  isFeatureProfile: boolean;
  totalFollowers: number;
  isWatching: boolean;
  isInvesting: boolean;
}

export interface IComment {
  id: string;
  customerId: number;
  customerInfo: ICustomerInfo;
  message: string;
  status: string;
  tagStocks: any;
  metadata: null;
  metadataList: null;
  urlImages: string[];
  urlLinks: null;
  tagPeople: ICustomerInfo[];
  children: IComment[];
  totalChildren: number;
  parentId: string;
  totalLikes: number;
  totalReports: number;
  level: number;
  likes: any;
  reports: any;
  timeString: string;
  isLike: boolean;
  isReport: boolean;
}
export interface IPost {
  children: any;
  customerId: number;
  id: string;
  isLike: boolean;
  isReport: boolean;
  likes: any;
  post: IContentPost;
  postId: string;
  postType: string;
  publishedAt: number;
  reactionScore: number;
  report: any;
  status: string;
  textSearch: string;
  timeString: string;
  totalChildren: number;
  totalLikes: number;
  totalReports: number;
  totalViews: number;
  isFollowing: boolean;
  seoMetadata: {
    imageSeo?: {
      alt: string;
      title: string;
    };
    slug: string;
  };
}
export interface IContentPost {
  customerId: number;
  hashtags?: string[];
  customerInfo: ICustomerInfo;
  id: string;
  message: string;
  metadata: any;
  metadataList: any;
  postCategory: any;
  postThemeId: any;
  postType: string;
  postTypeGroup: string;
  status: string;
  tagExchanges: any;
  tagPeople: any;
  tagStocks: string[];
  textSearch: string;
  urlImages: string[];
  urlLinks: string[];
  action: string;
  bgImage: string;
  themeName: string;
  themeCode: string;
  head: string;
  headImageUrl: string;
  url: string;
  stockCode: string;
  timeString: string;
  contentText: string;
  tradingDate: string;
  pnlRate: number;
  title: string;
  type: string;
  vendorInfo: IVendorInfo;
}

export interface IVendorInfo {
  id: string;
  logo: string;
  favicon: string;
  code: string;
  name: string;
  homeUrl: string;
}

export interface IResponseTotalShare {
  shares: {
    all: number;
  };
  total: number;
}

export enum TYPEPOST {
  POST = 'Post',
  ActivityTheme = 'ActivityTheme',
  ActivityWatchlist = 'ActivityWatchlist',
  ActivityMatchOrder = 'ActivityMatchOrder',
  VietstockNews = 'VietstockNews',
  VietstockLatestNews = 'VietstockLatestNews',
  VietstockStockNews = 'VietstockStockNews',
  TNCKNews = 'TNCKNews',
  PinetreeDailyNews = 'PinetreeDailyNews',
  PinetreeWeeklyNews = 'PinetreeWeeklyNews',
  PinetreeMorningBrief = 'PinetreeMorningBrief',
  PinetreeMarketBrief = 'PinetreeMarketBrief',
  PinetreePost = 'PinetreePost',
  CafeFNews = 'CafeFNews',
}

export const TypePostOnlyReportAction = [
  TYPEPOST.VietstockNews,
  TYPEPOST.VietstockLatestNews,
  TYPEPOST.VietstockStockNews,
  TYPEPOST.TNCKNews,
  TYPEPOST.PinetreeDailyNews,
  TYPEPOST.PinetreeWeeklyNews,
  TYPEPOST.PinetreeMorningBrief,
  TYPEPOST.PinetreeMarketBrief,
  TYPEPOST.CafeFNews,
];
