import classNames from 'classnames';
import React from 'react';
import { dateToMinuteHourMonthStringDayYear } from '../../../../helpers/parseDate';
import { toRupiah } from '../../../../helpers/toRupiah';
import {
  IVoucherMarketplaceResponse,
  IVoucherMerchantResponse,
} from '../../../../helpers/types';
import { Card } from '../../../atoms';
import style from './index.module.scss';

interface CardVoucherProps {
  item: IVoucherMarketplaceResponse | IVoucherMerchantResponse;
  voucher: IVoucherMarketplaceResponse | IVoucherMerchantResponse | undefined;
}

const CardVoucher: React.FC<CardVoucherProps> = ({ item, voucher }) => {
  const classProps = classNames(
    style.card__voucher,
    voucher === item ? style.card__voucher__active : '',
  );

  const isVoucherMarketplace = (
    item: IVoucherMarketplaceResponse | IVoucherMerchantResponse,
  ): item is IVoucherMarketplaceResponse => {
    return (
      (item as IVoucherMarketplaceResponse).discount_percentage !== undefined
    );
  };

  return (
    <Card className={classProps}>
      <div className={style.card__voucher__title}>
        <p>{item.code}</p>
      </div>
      <ul className={style.card__voucher__content}>
        <li>
          Discount {''}
          {isVoucherMarketplace(item)
            ? ` ${item.discount_percentage}%`
            : toRupiah(item.discount_nominal)}
        </li>
        <li>{'Minimum purchase ' + toRupiah(item.min_order_nominal)}</li>

        <li>
          {isVoucherMarketplace(item) &&
            'Discount up to ' + toRupiah(item.max_discount_nominal)}
        </li>
        <li>
          Expired at{' '}
          {dateToMinuteHourMonthStringDayYear(new Date(item.expired_at))}
        </li>
      </ul>
    </Card>
  );
};

export default CardVoucher;
