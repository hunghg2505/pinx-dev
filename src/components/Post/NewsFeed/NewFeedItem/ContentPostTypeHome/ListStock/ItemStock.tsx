import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH, imageStock } from '@utils/common';

const ItemStock = ({
  data,
  onTrackingViewTicker,
}: {
  data: string;
  onTrackingViewTicker?: (stockCode: string) => void;
}) => {
  return (
    <CustomLink
      onClick={() => {
        onTrackingViewTicker && onTrackingViewTicker(data);
      }}
      href={ROUTE_PATH.STOCK_DETAIL(data)}
    >
      <div className='mr-[6px]'>
        <div className='flex h-[32px] flex-row items-center justify-between rounded-[1000px] border-[1px] border-solid border-[rgba(88,157,192,0.24)] bg-[#1F6EAC] pl-[4px] pr-[6px] backdrop-blur-[2px] backdrop-filter'>
          <div className='mr-[6px] rounded-full bg-[#ffffff] shadow-[0_2px_4px_rgba(0,0,0,0.10)]'>
            <div className='flex h-[24px] min-w-[24px] max-w-[24px] items-center justify-center overflow-hidden rounded-full border-2 border-solid border-white object-contain'>
              <img src={imageStock(data)} alt='' className='block' />
            </div>
          </div>

          <Text type='body-12-medium' color='neutral-9'>
            {data}
          </Text>
        </div>
      </div>
    </CustomLink>
  );
};
export default ItemStock;
