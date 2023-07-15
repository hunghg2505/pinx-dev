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

export interface IResponseFinancialIndex {
  financialIndex?: {
    data?: {
      dividendYield: number;
      marketCap: number;
      pe: number;
      roe: number;
      volume: number;
    };
  };
}
