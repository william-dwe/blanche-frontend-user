import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../../molecules';
import style from './index.module.scss';

interface PaymentIframeProps {
  src: string;
  isIFrameOpen: boolean;
}

const PaymentIframe: React.FC<PaymentIframeProps> = ({ src, isIFrameOpen }) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();

  const handleLocationChange = () => {
    if (!ref?.current?.contentWindow?.location) return;
    const location = ref.current.contentWindow.location;

    const url = location.href;

    const urlSearchParams = new URLSearchParams(url?.split('?')[1]);

    const urlSearchParamsObj = Object.fromEntries(urlSearchParams);
    if (!urlSearchParamsObj.status) return;
    const isSuccess = urlSearchParamsObj.status === 'TXN_PAID';

    if (!isSuccess) {
      setTimeout(() => {
        navigate(0);
      }, 1000);
      return;
    }
    setTimeout(() => {
      navigate('/transactions');
    }, 1000);
  };

  return (
    <Modal
      open={isIFrameOpen}
      footer={null}
      width={800}
      closable={false}
      className={style.ti}
    >
      <iframe
        className={style.ti__iframe}
        src={src}
        title="Sealabs Pay OTP"
        loading="lazy"
        ref={ref}
        onLoad={handleLocationChange}
      />
    </Modal>
  );
};

export default PaymentIframe;
