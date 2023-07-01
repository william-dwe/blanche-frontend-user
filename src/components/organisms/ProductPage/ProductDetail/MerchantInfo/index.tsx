import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetMerchantInfoQuery } from '../../../../../app/features/merchant/merchantApiSlice';
import { Avatar, Card, Rate } from '../../../../atoms';
import style from './index.module.scss';

const MerchantInfo: React.FC = () => {
  const { store } = useParams();

  const { data: merchant } = useGetMerchantInfoQuery(store as string);

  return (
    <Card className={style.merchant__info}>
      <div className={style.merchant__info__body}>
        <Link to={`/${merchant?.domain}`}>
          <Avatar size={50} src={merchant?.image} alt={merchant?.name} />
        </Link>
        <div className={style.merchant__info__desc}>
          <Link
            to={`/${merchant?.domain}`}
            className={style.merchant__info__desc__link}
          >
            {merchant?.name}
          </Link>
          <p>{merchant?.address.city}</p>
        </div>
      </div>
      <div className={style.merchant__info__rate}>
        <Rate disabled value={merchant?.avg_rating} />
        <span className={style.merchant__info__rate__count}>
          ({merchant?.num_of_review} review)
        </span>
      </div>
    </Card>
  );
};

export default MerchantInfo;
