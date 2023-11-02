export const imageStock = (stock_code: string) => {
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const url = `${imageCompanyUrl}${
    stock_code?.length === 3 || stock_code?.[0] !== 'C' ? stock_code : stock_code?.slice(1, 4)
  }.png`;
  return url;
};
