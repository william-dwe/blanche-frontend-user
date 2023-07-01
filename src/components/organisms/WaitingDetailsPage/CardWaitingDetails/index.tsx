import React from 'react';
import { MdOutlineStorefront } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ITransactionWaiting } from '../../../../helpers/types';
import DetailProduct from '../../TransactionDetailsPage/DetailProduct';
import style from './index.module.scss';

interface CardWaitingDetailsProps {
  transaction: ITransactionWaiting;
}

const CardWaitingDetails: React.FC<CardWaitingDetailsProps> = ({
  transaction,
}) => {
  return (
    <div className={style.cwd}>
      <div className={style.cwd__header}>
        <div className={style.cwd__header__store}>
          <MdOutlineStorefront
            size={20}
            className={style.ct__header__store__icon}
          />
          <Link
            to={`/${transaction.merchant.domain}`}
            className={style.cwd__header__store__name}
          >
            {transaction.merchant.name}
          </Link>
        </div>
      </div>
      <div className={style.cwd__list}>
        {transaction.products.map((product) => (
          <DetailProduct product={product} key={product.product_slug} />
        ))}
      </div>
    </div>
  );
};

export default CardWaitingDetails;
