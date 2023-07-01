import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../../../../atoms';
import FilterStatus from '../../../TransactionsPage/FilterStatus';
import TablePromotion from '../TablePromotion';
import style from './index.module.scss';

const values = ['All', 'On Going', 'Incoming', 'Has Ended'];
const PromotionList: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/merchant/promotions/create');
  };

  return (
    <Card className={style.voucher__list}>
      <div className={style.voucher__list__header}>
        <h6>List Of my Promotions</h6>
        <Button type="primary" size="large" onClick={handleNavigate}>
          Create Promotion
        </Button>
      </div>

      <FilterStatus values={values} />
      <TablePromotion />
    </Card>
  );
};

export default PromotionList;
