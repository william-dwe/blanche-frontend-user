import React from 'react';
import { SEO, VoucherList } from '../../../../components';
import style from './index.module.scss';

const Voucher: React.FC = () => {
  return (
    <>
      <SEO title="Voucher List" description="Voucher List page" />
      <div className={style.voucher__page}>
        <div className={style.voucher__page__header}>
          <h3 className={style.voucher__page__header__title}>Voucher List</h3>
        </div>
        <VoucherList />
      </div>
    </>
  );
};

export default Voucher;
