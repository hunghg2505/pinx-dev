import { useAtomValue } from 'jotai';
import { useTranslation } from 'next-i18next';

import LoadCompVisible from '@components/LoadCompVisible/LoadCompVisible';
import { Button } from '@components/UI/Button';
import CustomLink from '@components/UI/CustomLink';
import IconPlus from '@components/UI/Icon/IconPlus';
import Text from '@components/UI/Text';
import ComponentWatchList from '@components/WatchList/ComponentWatchList';
import { StockSocketLocation, stockSocketAtom } from '@store/stockStocket';
import { ROUTE_PATH } from '@utils/common';
import {
  getMoreInfoTracking,
  viewTickerInfoTracking,
  viewWatchListTracking,
} from 'src/mixpanel/mixpanel';

// tracking event view ticker info
const handleTrackingViewStockInfo = (stockCode: string) => {
  viewTickerInfoTracking(stockCode, 'Sidebar layout right', 'Watch list', 'Stock');
};

const WatchList = () => {
  const { t } = useTranslation('common');
  const watchList = useAtomValue(stockSocketAtom);

  const handleTracking = () => {
    // tracking event view watch list
    const listStockCodes =
      watchList.find((item) => item.location === StockSocketLocation.WATCH_LIST_COMPONENT_LAYOUT)
        ?.stocks || [];

    viewWatchListTracking(
      'Default',
      'Normal WL',
      listStockCodes,
      listStockCodes.length,
      'Right sidebar layout',
    );

    // tracking event get more info
    getMoreInfoTracking('Right sidebar layout', 'Watchlist', 'My watchlist');
  };

  return (
    <LoadCompVisible>
      <div className='rounded-[8px] bg-white '>
        <ComponentWatchList
          isEdit={false}
          page_size={5}
          handleTrackingViewStockInfo={handleTrackingViewStockInfo}
          footer={(list) => {
            if (list?.length) {
              return (
                <CustomLink href={ROUTE_PATH.WATCHLIST} onClick={handleTracking}>
                  <Button className='mt-4 h-[40px] w-full rounded-[5px] bg-[#F0F7FC]'>
                    <Text type='body-14-bold' color='primary-2'>
                      {t('view_more')}
                    </Text>
                  </Button>
                </CustomLink>
              );
            }

            return (
              <CustomLink href={ROUTE_PATH.REGISTER_COMPANY}>
                <Button className='mt-4 flex h-[68px] w-full items-center justify-center gap-[10px] rounded-[12px] border-[1px] border-dashed border-[var(--primary-lightblue,#589DC0)] bg-[#FFF] [box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
                  <IconPlus />
                  <Text color='primary-2'>{t('add_favorite_stock')}</Text>
                </Button>
              </CustomLink>
            );
          }}
        />
      </div>
    </LoadCompVisible>
  );
};

export default WatchList;
