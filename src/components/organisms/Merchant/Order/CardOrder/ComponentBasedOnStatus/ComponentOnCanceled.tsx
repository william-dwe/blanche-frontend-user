import React from 'react';
import { Button } from '../../../../../atoms';
import style from '../index.module.scss';

const ComponentOnCanceled: React.FC = () => {
  return (
    <div className={style.card__order__actions__btn}>
      <Button type="primary" size="large" danger disabled>
        Canceled
      </Button>
    </div>
  );
};

export default ComponentOnCanceled;
