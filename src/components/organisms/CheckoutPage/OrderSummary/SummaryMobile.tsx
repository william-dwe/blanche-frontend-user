import { Collapse } from 'antd';
import React from 'react';
import { ICheckoutResponse } from '../../../../helpers/types';
import Summary from './Summary';

interface SummaryProps {
  order: ICheckoutResponse;
}
const SummaryMobile: React.FC<SummaryProps> = ({ order }) => {
  const { Panel } = Collapse;

  return (
    <Collapse>
      <Panel header="Order Summary" key="1">
        <Summary order={order} />
      </Panel>
    </Collapse>
  );
};

export default SummaryMobile;
