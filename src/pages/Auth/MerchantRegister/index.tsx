import { Col, Row } from 'antd';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import { CardMerchantRegistration, Image, SEO } from '../../../components';
import useMediaQuery from '../../../hooks/useMediaQuery';
import style from './index.module.scss';

const MerchantRegister: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 1210px)');

  const { user, isLoggedIn } = useAppSelector((state) => state.auth);

  if (user?.role === 'merchant' || !isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <SEO title="Merchant Register" description="Merchant Register page" />
      <div className={style.merchant__register}>
        <Row className={style.merchant__register__page} gutter={[64, 16]}>
          {!isMobile && (
            <Col flex="auto">
              <Image
                src="/assets/svg/illustration.svg"
                alt="Merchant Register"
                className={style.merchant__register__page__image}
              />
            </Col>
          )}
          <Col flex="auto">
            <CardMerchantRegistration />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MerchantRegister;
