import { Progress } from 'antd';
import React, { useEffect } from 'react';
import { capitalizeFirstLetter } from '../../../../../helpers/capitalizeFirstLetter';
import { dateToMinuteHourMonthStringDayYear } from '../../../../../helpers/parseDate';
import { toRupiah } from '../../../../../helpers/toRupiah';
import { IPromotion } from '../../../../../helpers/types/merchant/promotion.merchant.inteface';
import { Card, Image, Tag } from '../../../../atoms';
import { Modal, ModalHeader } from '../../../../molecules';
import style from './index.module.scss';

interface PromotionDetailModalProps {
  promotion: IPromotion;
  isModalOpen: boolean;
  handleCancel: () => void;
}

const mapStatusToColor = {
  incoming: 'green',
  ongoing: 'blue',
  expired: 'red',
};

const PromotionDetailModal: React.FC<PromotionDetailModalProps> = ({
  promotion,
  isModalOpen,
  handleCancel,
}) => {
  const [status, setStatus] = React.useState('waiting');

  useEffect(() => {
    if (
      promotion.start_date > new Date().toISOString() &&
      promotion.end_date > new Date().toISOString()
    ) {
      setStatus('incoming');
      return;
    }

    if (
      promotion.start_date < new Date().toISOString() &&
      promotion.end_date > new Date().toISOString()
    ) {
      setStatus('ongoing');
      return;
    }

    if (
      promotion.start_date < new Date().toISOString() &&
      promotion.end_date < new Date().toISOString()
    ) {
      setStatus('expired');
      return;
    }
  }, [promotion]);
  return (
    <Modal open={isModalOpen} closable onCancel={handleCancel} footer={null}>
      <ModalHeader title="Promotion Detail" />

      {
        <Card className={style.detail__promotion}>
          <Image
            src="/assets/png/promotion-detail.png"
            alt={promotion.title}
            className={style.detail__promotion__img}
          />
          <div className={style.detail__promotion__info}>
            <p className={style.detail__promotion__info__name}>
              {promotion.title}
            </p>
            <p className={style.detail__promotion__info__period}>
              {dateToMinuteHourMonthStringDayYear(
                new Date(promotion.start_date),
              )}{' '}
              -{' '}
              {dateToMinuteHourMonthStringDayYear(new Date(promotion.end_date))}
            </p>
            <p className="detail__promotion__info__desc">
              {' '}
              Discount{' '}
              {promotion.promotion_type === 'nominal'
                ? toRupiah(promotion.discount_nominal)
                : promotion.discount_percentage + ' % '}
            </p>
            <p>Max Discount Quantity : {promotion.max_discounted_quantity}</p>

            <div className={style.detail__promotion__info__used}>
              <p className={style.used__title}>Used</p>
              <Progress
                percent={promotion.used_quota}
                status="active"
                format={() => `${promotion.used_quota}/${promotion.quota}`}
              />
            </div>
            <Tag
              className={style.detail__promotion__info__tag}
              color={mapStatusToColor[status as keyof typeof mapStatusToColor]}
            >
              {capitalizeFirstLetter(status)}
            </Tag>
          </div>
        </Card>
      }
    </Modal>
  );
};

export default PromotionDetailModal;
