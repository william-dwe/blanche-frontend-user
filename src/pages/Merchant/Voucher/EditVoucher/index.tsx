import { Divider } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { AddVoucherPage, SEO } from '../../../../components';
import style from './index.module.scss';

const EditVoucher: React.FC = () => {
  const { code } = useParams();
  return (
    <>
      <SEO title={`Edit Voucher`} description={`Edit Voucher`} />
      <div className={style.add__voucher__page}>
        <div className={style.add__voucher__page__header}>
          <h3 className={style.add__voucher__page__header__title}>
            Edit Voucher {code}
          </h3>
          <p className={style.add__voucher__page__header__subtitle}>
            Buyer can use this voucher to buy your product or service at your
            store.
          </p>
        </div>
        <Divider />
        <AddVoucherPage isEdit={true} />
      </div>
    </>
  );
};

export default EditVoucher;
