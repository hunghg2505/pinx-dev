export const getStockColor = (
  last_price: number,
  ceil_price: number,
  floor_price: number,
  ref_price: number,
) => {
  if (last_price === ceil_price) {
    return '#782AF9';
  }
  if (last_price === floor_price) {
    return '#22D1E9';
  }
  if (last_price === ref_price) {
    return '#F1BA09';
  }
  if (last_price < ref_price) {
    return '#DA314F';
  }
  return '#128F63';
};
