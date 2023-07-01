import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../../atoms';
import style from '../index.module.scss';

const ComponentOnRequestRefund: React.FC = () => {
  const classProps = classNames(style.os__status, style.os__status__canceled);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/merchant/refunds');
  };

  return (
    <div className={classProps}>
      <Button size="large" danger onClick={handleNavigate} type="link">
        Go to refund list
      </Button>
    </div>
  );
};

export default ComponentOnRequestRefund;
