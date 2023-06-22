import { toast } from 'react-hot-toast';
import Notification from '../Notification';

const ToastUnAuth = () => {
  return toast(() => (
    <Notification type='error' message='Bạn phải đăng nhập để thực hiện chức năng này' />
  ));
};
export default ToastUnAuth;
