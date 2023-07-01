import { Rate } from 'antd';
import React from 'react';
import { formatToDate } from '../../../../helpers/formatToDate';
import { IMerchantInfo } from '../../../../helpers/types';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import { Avatar, Card } from '../../../atoms';
import style from './index.module.scss';

interface CardSellerProfileProps {
  data: IMerchantInfo | undefined;
  isLoading: boolean;
}

const CardSellerProfile: React.FC<CardSellerProfileProps> = ({ data }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Card className={style.card__seller__profile}>
      <div className={style.card__seller__profile__desc}>
        <Avatar size={isMobile ? 50 : 100} src={data?.image} alt={data?.name} />
        <div className={style.card__seller__profile__desc__info}>
          <p className={style.card__seller__profile__desc__link}>
            {data?.name}
          </p>
          {data?.address?.city && (
            <p>
              {data?.address.city}, {data?.address.province}
            </p>
          )}
          <p>Joined Date {formatToDate(data?.join_date || '')} </p>
        </div>
      </div>
      <div className={style.card__seller__profile__analytic}>
        <div className={style.card__seller__profile__analytic__item}>
          <Rate value={data?.avg_rating} /> <span>({data?.num_of_review})</span>
          <p>Rating & Reviews</p>
        </div>
        <div className={style.card__seller__profile__analytic__item}>
          <p>{data?.num_of_product}</p>
          <p>Products</p>
        </div>
      </div>
    </Card>
  );
};

export default CardSellerProfile;
