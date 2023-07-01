import React from 'react';
import { Button } from '../../../../../atoms';
import style from '../index.module.scss';
import classNames from 'classnames';

const ComponentOnCompleted: React.FC = () => {
  const classProps = classNames(style.os__status, style.os__status__completed);

  return (
    <div className={classProps}>
      <div className={style.os__status__item}>
        <p className={style.os__status__item__text}>Order has been completed</p>
      </div>
      <div className={style.os__status__action}>
        <Button type="primary" size="large" ghost disabled>
          Order Completed
        </Button>
      </div>
    </div>
  );
};

export default ComponentOnCompleted;
