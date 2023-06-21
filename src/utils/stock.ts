export const convertStockDataMarketInfo = (data: any) => {
  if (data.side === 'S') {
    const [sell_price_1, sell_volumn_1] = data.g1.split('|');
    const [sell_price_2, sell_volumn_2] = data.g2.split('|');
    const [sell_price_3, sell_volumn_3] = data.g3.split('|');
    return {
      stock_code: data.sym,
      sell_price_1,
      sell_volumn_1,
      sell_price_2,
      sell_volumn_2,
      sell_price_3,
      sell_volumn_3,
    };
  } else {
    const [buy_price_1, buy_volumn_1] = data.g1.split('|');
    const [buy_price_2, buy_volumn_2] = data.g2.split('|');
    const [buy_price_3, buy_volumn_3] = data.g3.split('|');
    return {
      stock_code: data.sym,
      buy_price_1,
      buy_volumn_1,
      buy_price_2,
      buy_volumn_2,
      buy_price_3,
      buy_volumn_3,
    };
  }
};
export const convertStockDataPriceChange = (data: any) => {
  const unit = data.cl === 'd' || data.cl === 'f' ? '-' : '+';
  return {
    stock_code: data.sym,
    last_price: data.lastPrice,
    last_vol: data.lastVol,
    change_price_percent: +`${unit}${data.changePc}`,
    change_price: +`${unit}${data.change}`,
    highest_price: data.hp,
    lowest_price: data.lp,
    total_vol: data.totalVol,
  };
  // const stockCode = data.symbol || data.sym;
  // if (stockCode === product.stock_code) {
  //   this.product = {
  //     ...this.product,
  //     foreign_buy_vol: +data.fBVol,
  //     foreign_sell_vol: +data.fSVolume,
  //     total_room: +data.fRoom,
  //   };
  // }
};
