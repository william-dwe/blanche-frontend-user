import React from 'react';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { IPromotion } from '../../../../../helpers/types/merchant/promotion.merchant.inteface';
import { Button, Image } from '../../../../atoms';
import PromotionDetailModal from '../PromotionDetail';
import style from './index.module.scss';

export interface TableItemProps {
  promotion: IPromotion;
}

const CardPromotion: React.FC<TableItemProps> = ({ promotion }) => {
  const [isModalDetailOpen, setIsModalDetailOpen] = React.useState(false);

  const handleOpenModalDetail = () => {
    setIsModalDetailOpen(true);
  };
  const handleCloseModalDetail = () => {
    setIsModalDetailOpen(false);
  };

  return (
    <div className={style.table__promotions__cv}>
      <Image
        className={style.table__promotions__cv__img}
        src="/assets/png/promotion.png"
        alt=""
        imageClassName={style.table__promotions__cv__img__item}
      />
      <Button
        type="link"
        onClick={handleOpenModalDetail}
        className={style.table__promotions__cv__info}
      >
        <p className={style.table__promotions__cv__info__name}>
          {promotion.title}
        </p>
        <p className={style.table__promotions__cv__info__desc}>
          Discount{' '}
          {promotion.promotion_type === 'nominal'
            ? toRupiah(promotion.discount_nominal)
            : promotion.discount_percentage + ' % '}
        </p>
      </Button>

      <PromotionDetailModal
        isModalOpen={isModalDetailOpen}
        promotion={promotion}
        handleCancel={handleCloseModalDetail}
      />
    </div>
  );
};

export default CardPromotion;
