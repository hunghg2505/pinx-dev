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
