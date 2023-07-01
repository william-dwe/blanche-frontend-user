import { Col, Row } from 'antd';
import React from 'react';
import { useGetWalletDetailsQuery } from '../../../app/features/wallet/walletApiSlice';
import CardWallet from './CardWallet';
import CardWalletDetails from './CardWalletDetails';

const WalletPage: React.FC = () => {
  const { data, isError, isLoading, isSuccess } = useGetWalletDetailsQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );
  return (
    <Row gutter={[32, 32]}>
      <Col xl={8} xs={24}>
        <CardWallet data={data} isError={isError} isLoading={isLoading} />
      </Col>
      <Col xl={16} xs={24}>
        <CardWalletDetails isSuccess={isSuccess} />
      </Col>
    </Row>
  );
};

export default WalletPage;
