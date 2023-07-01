import { Col, Row } from 'antd';
import React from 'react';
import CardWallet from './CardWallet';
import CardWalletDetails from './CardWalletDetails';

const SellerFundPage: React.FC = () => {
  return (
    <Row gutter={[32, 32]}>
      <Col xl={8}>
        <CardWallet />
      </Col>
      <Col xl={16}>
        <CardWalletDetails />
      </Col>
    </Row>
  );
};

export default SellerFundPage;
