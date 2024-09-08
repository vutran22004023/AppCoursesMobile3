import { useRef } from 'react';
import Toast from '@/components/Common/Toast';
// success, warning, error
const useToast = () => {
  const toastRef = useRef(null);

  const showToast = ({ type, text, duration = 2000 }) => {
    if (toastRef.current) {
      toastRef.current.show({ type, text, duration });
    }
  };

  return { Toast: <Toast ref={toastRef} />, showToast };
};

export default useToast;
