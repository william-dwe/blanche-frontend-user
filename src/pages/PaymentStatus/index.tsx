import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import style from './index.module.scss';
import { Image } from '../../components';

const PaymentStatus: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search?.split('?')[1]);
  const urlSearchParamsObj = Object.fromEntries(urlSearchParams);
  const isSuccess = urlSearchParamsObj.status === 'TXN_PAID';

  useEffect(() => {
    if (window.self === window.top) {
      navigate('/', { replace: true });
    }
  }, []);

  return (
    <div className={style.ts}>
      <Image
        src={isSuccess ? '/assets/svg/success.svg' : '/assets/svg/Broken.svg'}
        alt="success"
        className={style.ts__img}
      />
      <h2 className={style.ts__title}>
        Payment {isSuccess ? 'Success' : 'Failed'}
      </h2>
    </div>
  );
};

export default PaymentStatus;
