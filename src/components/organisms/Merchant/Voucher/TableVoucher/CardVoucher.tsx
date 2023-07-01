import React from 'react';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { Button, Image } from '../../../../atoms';
import VoucherDetailModal from '../VoucherDetail';
import { CardVoucherProps } from './CardQuota';
import style from './index.module.scss';

const CardVoucher: React.FC<CardVoucherProps> = ({ voucher }) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);

  const handleOpenModalDetail = () => {
    setIsModalDetailOpen(true);
  };
  const handleCloseModalDetail = () => {
    setIsModalDetailOpen(false);
  };
  return (
    <div className={style.table__voucher__cv}>
      <Image
        className={style.table__voucher__cv__img}
        src="/assets/png/voucher.png"
        alt={voucher.code}
        imageClassName={style.table__voucher__cv__img__item}
      />
      <Button
        type="link"
        className={style.table__voucher__cv__info}
        onClick={handleOpenModalDetail}
      >
        <p className={style.table__voucher__cv__info__name}>{voucher.code}</p>
        <p className={style.table__voucher__cv__info__desc}>
          Discount {toRupiah(voucher.discount_nominal)}
        </p>
      </Button>

      <VoucherDetailModal
        isModalOpen={isModalDetailOpen}
        voucher={voucher}
        handleCancel={handleCloseModalDetail}
      />
    </div>
  );
};

export default CardVoucher;
