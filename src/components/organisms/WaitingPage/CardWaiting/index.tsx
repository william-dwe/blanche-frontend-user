import { Divider } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PaymentIframe } from '../../..';
import { dateToMinuteHourMonthStringDayYear } from '../../../../helpers/parseDate';
import { toRupiah } from '../../../../helpers/toRupiah';
import { IWaitingPayment } from '../../../../helpers/types';
import { Button, Card } from '../../../atoms';
import style from './index.module.scss';

interface CardWaitingProps {
  item: IWaitingPayment;
}

const CardWaiting: React.FC<CardWaitingProps> = ({ item }) => {
  const navigate = useNavigate();
  const [isIFrameOpen, setIsIFrameOpen] = useState(false);

  const handleDetails = () => {
    navigate(item.payment_id);
  };

  const handleClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsIFrameOpen(true);
  };

  return (
    <>
      <Card className={style.cw} onClick={handleDetails}>
        <div className={style.cw__header}>
          <p className={style.cw__header__created}>
            {dateToMinuteHourMonthStringDayYear(new Date(item.created_at), ' ')}
          </p>
          <div>
            <p className={style.cw__header__before}>Pay Before</p>
            <p className={style.cw__header__expired}>
              {dateToMinuteHourMonthStringDayYear(
                new Date(item.pay_before),
                ' ',
              )}
            </p>
          </div>
        </div>
        <Divider className={style.cw__divider} />
        <div className={style.cw__body}>
          <div>
            <p className={style.cw__body__title}>Order Code</p>
            <p className={style.cw__body__desc}>{item.order_code}</p>
          </div>
          <div className={style.cw__body__right}>
            <p className={style.cw__body__title}>{item.payment_method}</p>
            <p className={style.cw__body__desc}>
              {item.payment_related_account}
            </p>
          </div>
        </div>
        <Divider className={style.cw__divider} />
        <div className={style.cw__footer}>
          <p className={style.cw__footer__total}>
            Total: <span>{toRupiah(item.amount)}</span>
          </p>
          <Button
            className={style.cw__footer__link}
            type="primary"
            onClick={handleClick}
            ghost
          >
            Pay Now
          </Button>
        </div>
      </Card>
      <PaymentIframe src={item.redirect_url} isIFrameOpen={isIFrameOpen} />
    </>
  );
};

export default CardWaiting;
