import React from 'react';
import {
  IGetTransactionDetailsResponse,
  ITransaction,
} from '../../../helpers/types';
import { IGetProductReviewByInvCodeResponse } from '../../../helpers/types/review.interface';
import { Modal, ModalHeader } from '../../molecules';
import CardReviewProduct from './CardReviewProduct';
import style from './index.module.scss';

interface ModalReviewProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  data: IGetProductReviewByInvCodeResponse[] | undefined;
  transaction: ITransaction | IGetTransactionDetailsResponse | undefined;
}

const ModalReview: React.FC<ModalReviewProps> = ({
  isModalOpen,
  handleCancel,
  data,
  transaction,
}) => {
  return (
    <Modal
      open={isModalOpen}
      centered
      bodyStyle={{
        height: '50vh',
        overflowY: 'scroll',
      }}
      onCancel={handleCancel}
      className={style.review__modal}
      width={600}
      footer={null}
    >
      <ModalHeader
        title="Review Product"
        info="Your review will be used to improve the quality of our products . Thank you for your cooperation."
      />
      <div className={style.review__modal__body}>
        {data?.map((item) => (
          <CardReviewProduct
            key={item.product_name}
            data={item}
            transaction={transaction}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ModalReview;
