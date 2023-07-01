import { Divider } from 'antd';
import React from 'react';
import { AddVoucherPage, SEO } from '../../../../components';
import style from './index.module.scss';

const DuplicateVoucher: React.FC = () => {
  return (
    <>
      <SEO title="Duplicate Voucher" description="Duplicate Voucher page" />
      <div className={style.add__voucher__page}>
        <div className={style.add__voucher__page__header}>
          <h3 className={style.add__voucher__page__header__title}>
            Create Voucher
          </h3>
          <p className={style.add__voucher__page__header__subtitle}>
            Buyer can use this voucher to buy your product or service at your
            store.
          </p>
        </div>
        <Divider />
        <AddVoucherPage isDuplicate={true} />
      </div>
    </>
  );
};

export default DuplicateVoucher;
