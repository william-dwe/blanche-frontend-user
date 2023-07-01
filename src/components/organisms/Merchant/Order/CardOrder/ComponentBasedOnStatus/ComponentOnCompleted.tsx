import React from 'react';
import { Button } from '../../../../../atoms';
import style from '../index.module.scss';

const ComponentOnCompleted: React.FC = () => {
  return (
    <div className={style.card__order__actions__btn}>
      <Button type="primary" size="large" ghost disabled>
        Order Completed
      </Button>
    </div>
  );
};

export default ComponentOnCompleted;
