import { ICustomerInfo, IPost } from '@components/Post/service';

export interface IResponseStockDetail {
  stockDetail?: {
    data?: {
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
    };
  };
}

interface IProduct {
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

interface IHighlights {
  id: string;
  tagName: string;
  description: string;
}

interface IRevenue {
  id: string;
  createdAt: string;
  updatedAt: string;
  sourceVi: string;
  sourceEn: null;
  revenueValue: number;
  percentage: number;
  reference: null;
}

interface IIndustrie {
  id: string;
  tagName: string;
  description: string;
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

export interface IResponseTaggingInfo {
  taggingInfo?: {
    data?: {
      companyId: string;
      stockCode: string;
      name: string;
      products: IProduct[];
      highlights: IHighlights[];
      revenues: IRevenue[];
      industries: IIndustrie[];
      subsidiaries: ISubsidiaries[];
    };
  };
}

export interface IResponseFinancialIndex {
  financialIndex?: {
    data?: IFinancialIndex;
  };
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
}

export interface IResponseStockEvents {
  stockEvents?: {
    data: {
      list: {
        post: StockEventPost;
      }[];
      last: string;
      hasNext: boolean;
    };
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
}

export interface IResponseThemesOfStock {
  stockThemes: {
    data: IStockTheme[];
  };
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

export interface IResponseStockDetailsExtra {
  stockDetails?: {
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
  };
  refreshStockDetails: () => void;
}

export interface IReview {
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
  reviews?: {
    data: {
      list: IReview[];
      last: string;
      hasNext: boolean;
    };
  };
  refreshStockReviews: () => void;
}

export interface IResponseStockNews {
  stockNews?: {
    data: {
      list: IPost[];
      last: string;
      hasNext: boolean;
    };
  };
  refreshStockNews: () => void;
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
