import React from 'react';
import { Button } from '../../../../../../atoms';

const ActionOnNeedRejected: React.FC = () => {
  return (
    <Button type="primary" ghost danger disabled>
      Rejected
    </Button>
  );
};

export default ActionOnNeedRejected;
