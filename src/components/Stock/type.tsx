import { ICustomerInfo, IPost } from '@components/Post/service';

export enum TabType {
  MOVEMENTS = 'MOVEMENTS',
  MATCHINGS = 'MATCHINGS',
  INTRADAY = 'INTRADAY',
}

export interface IStock {
  stockType: string;
  changePc: string;
  preChangePc?: string;
  lastPrice: number;
  preLastPrice?: number;
  marketCapital: number;
  changePrice: string;
  preChangePrice?: string;
  r: number;
  f: number;
  c: number;
  volume: number;
  stockCode: string;
  stockExchange: string;
  isVn30: boolean;
  isHnx30: boolean;
  name: string;
  shortName: string;
  nameEn: string;
  nameVi: string;
  companyName: string;
  firstTradingSessionPrice: number;
  email: string;
  address: string;
  permanentAddress: string;
  contactPersonPosition: string;
  lastUpdate: string;
  isMargin: boolean;
  image: null;
  companyTypeName: string;
  url: string;
  businessPermit: string;
  contactPerson: string;
  taxCode: string;
  ctyKiemToan: string;
  subIndustryName: string;
  phone: string;
  branch: string;
  foundDate: string;
  industryName: string;
  notes: string;
  isVNMETF: true;
  status: number;
  infoSupplier: string;
  issueDate: string;
  companyType: number;
  capital: number;
  isFTSE: true;
  phoneSupplier: string;
  infoSupplierPosition: string;
  introduction: string;
  postUpDate: string;
  sectorName: string;
  stockFaceValue: number;
  fax: string;
  foundPermit: string;
  identityNumber: string;
  volIpo: number;
  volActive: number;
  products: IProduct[];
}

export interface IResponseStockDetail {
  stockDetail?: {
    data?: IStock;
  };
  loading: boolean;
}

export interface IProduct {
  name: string;
  imageUrl: string;
}

export interface IResponseShareholder {
  shareholder?: {
    data?: {
      name: string;
      ratio: number;
      value: number;
    }[];
  };
  loading: boolean;
}

export interface IOptions {
  onSuccess?: (res: any) => void;
  onError?: (error: any) => void;
}

export interface IResponseMyStocks {
  data: {
    customerId: number;
    name: string;
    stocks: {
      stockCode: string;
      stockExchange: string;
      name: string;
      shortName: string;
    }[];
  }[];
}

export interface IHashtag {
  id: string;
  tagName: string;
  description: string;
}

interface IRevenue {
  id: string;
  createdAt: string;
  updatedAt: string;
  sourceVi: string;
  sourceEn: string;
  revenueValue: number;
  percentage: number;
  reference: null;
}

export interface ISubsidiaries {
  companyId: string;
  companyNameVi: string;
  companyNameEn: string;
  ownerRatio: number;
  description: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  stockCode: string;
  stockExchange: string;
  name: string;
  image: string;
  mainBusiness: string;
  listed: false;
}

export interface ITaggingInfo {
  companyId: string;
  stockCode: string;
  name: string;
  products: IProduct[];
  highlights: IHashtag[];
  revenues: IRevenue[];
  industries: IHashtag[];
  subsidiaries: ISubsidiaries[];
}

export interface IResponseTaggingInfo {
  taggingInfo?: {
    data?: ITaggingInfo;
  };
  loading: boolean;
}

export interface IResponseFinancialIndex {
  financialIndex?: {
    data?: IFinancialIndex;
  };
  loading: boolean;
}

export enum FinancialIndexKey {
  marketCap = 'marketCap',
  volume = 'volume',
  roe = 'roe',
  pe = 'pe',
  dividendYield = 'dividendYield',
}

export interface IFinancialIndex {
  [FinancialIndexKey.marketCap]: number;
  [FinancialIndexKey.volume]: number;
  [FinancialIndexKey.dividendYield]: number;
  [FinancialIndexKey.roe]: number;
  [FinancialIndexKey.pe]: number;
}

export interface IResponseHoldingRatio {
  holdingRatio?: {
    data: {
      date: string;
      name: string;
      note: string;
      rate: number;
      shares: number;
    }[];
  };
  loading: boolean;
}

export interface IResponseStockEvents {
  stockEvents?: IResponseStockEvents2;
  onGetFinancialCalendar: (last?: string) => void;
  loading: boolean;
}

export interface IResponseStockEvents2 {
  data: {
    list: {
      post: StockEventPost;
    }[];
    last: string;
    hasNext: boolean;
  };
}

export interface StockEventPost {
  note: string;
  name: string;
  publishTime: string;
  tagStocks: string[];
  fileUrl: string;
}

export interface IStockTheme {
  latestSubscribe: {
    avatar: string;
  }[];
  name: string;
  url: string;
  totalSubscribe: number;
  code: string;
}

export interface IResponseThemesOfStock {
  stockThemes: {
    data: IStockTheme[];
  };
  loading: boolean;
}

interface IWatchingInvesting {
  aid: null;
  customerId: number;
  name: string;
  displayName: string;
  avatar: string;
  numberFollowers: number;
  isKol: boolean;
  isFeatureProfile: boolean;
  isWatching: true;
  isInvesting: boolean;
  totalFollowers: number;
}

export interface IStockDetails {
  data: {
    details: {
      id: string;
      stockCode: string;
      rate: {
        rate1: number;
        rate2: number;
        rate3: number;
        rate4: number;
        rate5: number;
        totalRates: number;
        rateAverage: number;
      };
      totalReviews: number;
      totalMentions: number;
      children: IReview[];
    };
    customerReview?: {
      rateValue: number;
      message: string;
      customerInfo: ICustomerInfo;
    };
    watchingNo: number;
    watchingInvestingNo: number;
    watchingList: IWatchingInvesting[];
    watchingInvestingList: IWatchingInvesting[];
  };
}

export interface IResponseStockDetailsExtra {
  stockDetails?: IStockDetails;
  refreshStockDetails: () => void;
  loading: boolean;
}

export interface IReview {
  createdDate: string;
  id: string;
  stockCode: string;
  customerId: number;
  customerInfo: {
    id: number;
    customerId: number;
    name: string;
    displayName: string;
    avatar: string;
    numberFollowers: number;
    isKol: boolean;
    isFeatureProfile: boolean;
  };
  message: string;
  status: string;
  tagStocks: null;
  metadata: null;
  metadataList: [];
  urlImages: null;
  urlLinks: null;
  tagPeople: null;
  rateValue: number;
}

export interface IResponseStockReviews {
  data: {
    list: IReview[];
    last: string;
    hasNext: boolean;
  };
}

export interface IResponseStockNews {
  data: {
    list: IPost[];
    last: string;
    hasNext: boolean;
  };
}

export interface IResponseStockNews2 {
  stockNews: IResponseStockNews;
  refreshStockNews: () => void;
  onGetStockNews: (last?: string) => void;
  loading: boolean;
}

export interface IResponseStockActivities {
  stockActivities?: {
    data: {
      list: IPost[];
      last: string;
      hasNext: boolean;
    };
  };
  refreshStockActivities: () => void;
}

export enum ActivityIconType {
  SUBSCRIBE = 'ADD',
  UNSUBSCRIBE = 'REMOVE',
  INVESTED = 'BUY',
  SOLD = 'SELL',
}

export interface IResponseWatchingInvesting {
  data: {
    list: ICustomerInfo[];
    last: string;
    hasNext: boolean;
  };
}

export enum CompanyRelatedType {
  INDUSTRY = 'industry',
  HIGHLIGHTS = 'highlights',
}

export interface IResponseCompaniesRelated {
  data: {
    list: IStock[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
    hasNext: boolean;
  };
}

export enum ShareStockAction {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

export interface IPayloadShareStock {
  action: ShareStockAction;
  message?: string;
  stockCode: string;
}

export enum FinancialType {
  QUARTER = 'QUARTER',
  YEAR = 'YEAR',
}

export interface IStockData {
  id: number;
  flag: string;
  sym: string;
  name: string;
  mc: string;
  c: number;
  r: number;
  f: number;
  lastPrice: number;
  lastVolume: number;
  lot: number;
  ot: string;
  changePc: string;
  avePrice: string;
  highPrice: string;
  lowPrice: string;
  g1: string;
  g2: string;
  g3: string;
  g4: string;
  g5: string;
  g6: string;
  g7: string;
  mp: string;
  brd: string;
  volumeInDay: number;
  fBVol: string;
  fBValue: string;
  fSVol: null;
  fSVolume: string;
  fSValue: string;
  fRoom: string;
}

export interface IResponseStockData {
  stockData?: {
    data: IStockData;
  };
}

export interface IResponseFinancialIndicator {
  financialIndicator?: {
    data: {
      head: {
        id: number;
        companyId: number;
        yearPeriod: number;
        termCode: string;
        termName: string;
        termNameEN: string;
        reportTermID: number;
        displayOrdering: number;
        united: string;
        auditedStatus: string;
        periodBegin: string;
        periodEnd: string;
        totalRow: number;
        businessType: number;
      };
      content: {
        eps: number;
        bvps: number;
        pe: number;
        ros: number;
        roea: number;
        roaa: number;
      };
      previousQuarterContent: {
        eps: number;
        bvps: number;
        pe: number;
        ros: number;
        roea: number;
        roaa: number;
      };
      hasBack: boolean;
    };
  };
  onGetFinancialIndicator: (page?: number) => void;
  loading: boolean;
}

export enum FinancialAnnualKey {
  EPS = 'eps',
  BVPS = 'bvps',
  PE = 'pe',
  ROS = 'ros',
  ROEA = 'roea',
  ROAA = 'roaa',
}

export interface IStockTrade {
  id: number;
  sym: string;
  lastVol: number;
  lastPrice: number;
  color: null;
  cl: string;
  change: string;
  totalVol: number;
  board: null;
  time: string;
}

export interface IResponseStockTrade {
  stockTrade?: {
    data: IStockTrade[];
  };
  loading: boolean;
}

export interface IResponseStockIntraday {
  stockIntraday?: {
    data: {
      price: number;
      total: number;
    }[];
  };
  loading: boolean;
}
