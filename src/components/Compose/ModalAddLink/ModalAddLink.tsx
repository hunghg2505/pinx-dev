import ModalLink from './ModalLink';

export const ModalAddLink = ({ isUpdateActivities, getDataOG }: any) => {
  if (isUpdateActivities) {
    return <></>;
  }

  return (
    <ModalLink getDataOG={getDataOG}>
      <div className='flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9]'>
        <img src='/static/icons/explore/iconLink.svg' alt='' className='w-[20px]' />
      </div>
    </ModalLink>
  );
};
