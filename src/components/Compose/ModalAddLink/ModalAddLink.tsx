import ModalLink from './ModalLink';

interface IProps {
  isUpdateActivities: any;
  getDataOG: any;
  urlLinkInitial?: string;
}
export const ModalAddLink = (props: IProps) => {
  const { isUpdateActivities, getDataOG, urlLinkInitial } = props;
  if (isUpdateActivities) {
    return <></>;
  }

  return (
    <ModalLink getDataOG={getDataOG} urlLinkInitial={urlLinkInitial}>
      <div className='flex  h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[1000px] border-[1px] border-solid border-[#B1D5F1] bg-[#EEF5F9] galaxy-max:h-[32px] galaxy-max:w-[32px]'>
        <img loading='lazy' src='/static/icons/explore/iconLink.svg' alt='' className='w-[20px]' />
      </div>
    </ModalLink>
  );
};
