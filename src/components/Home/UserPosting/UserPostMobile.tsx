import dynamic from 'next/dynamic';

import ComposeButton from '../ComposeButton';

const ModalComposeMobile = dynamic(() => import('@components/Compose/ModalComposeMobile'));

const UserPostMobile = ({ onAddNewPost }: any) => {
  return (
    <ModalComposeMobile refresh={onAddNewPost}>
      <ComposeButton />
    </ModalComposeMobile>
  );
};

export default UserPostMobile;
