import React from 'react';
import { Button } from '../../../../../../atoms';

const ActionOnNeedApprovalAdmin: React.FC = () => {
  return (
    <Button type="primary" ghost danger disabled>
      Waiting for admin approval
    </Button>
  );
};

export default ActionOnNeedApprovalAdmin;
