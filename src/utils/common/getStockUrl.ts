import { toNonAccentVietnamese } from '@utils/common/toNonAccentVietnamese';

export const getStockUrl = (data: any) => {
  if (data.name) {
    return `${data.stockCode.toLowerCase()}-${toNonAccentVietnamese(data.name)
      .toLowerCase()
      .replaceAll(' ', '-')}`;
  } else if (data.companyName) {
    return `${data.stockCode.toLowerCase()}-${toNonAccentVietnamese(data.companyName)
      .toLowerCase()
      .replaceAll(' ', '-')}`;
  } else {
    return data.stockCode;
  }
};
