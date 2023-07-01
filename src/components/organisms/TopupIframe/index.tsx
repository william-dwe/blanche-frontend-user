import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './index.module.scss';

interface TopupIframeProps {
  src: string;
}

const TopupIframe: React.FC<TopupIframeProps> = ({ src }) => {
  const ref = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();

  const locationURL = useLocation();
  const handleLocationChange = () => {
    if (!ref?.current?.contentWindow?.location) return;
    const location = ref.current.contentWindow.location;
    const url = location.href;
    const from =
      locationURL.state?.from?.pathname + locationURL.state?.from?.search ||
      '/wallet';

    const urlSearchParams = new URLSearchParams(url?.split('?')[1]);
    const urlSearchParamsObj = Object.fromEntries(urlSearchParams);
    if (!urlSearchParamsObj.status) return;
    setTimeout(() => {
      navigate(from);
    }, 1000);
  };

  return (
    <div className={style.ti}>
      <iframe
        className={style.ti__iframe}
        src={src}
        title="Sealabs Pay OTP"
        loading="lazy"
        ref={ref}
        onLoad={handleLocationChange}
      />
    </div>
  );
};

export default TopupIframe;
