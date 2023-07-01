import React from 'react';
import Modal from '../../../molecules/Modal';
import { Button } from '../../../atoms';
import style from './index.module.scss';
import { ModalHeader } from '../../..';

interface ModalWarningPageProps {
  isModalOpen: boolean;
  handleOk: () => void;
}

const ModalWarning: React.FC<ModalWarningPageProps> = ({
  isModalOpen,
  handleOk,
}) => {
  return (
    <Modal
      open={isModalOpen}
      closable={false}
      centered
      className={style.modal__warning}
      width={450}
      footer={null}
    >
      <ModalHeader
        className={style.modal__warning__header}
        title="Order is not eligible"
        info="Sorry, it seems your order is mistaken, please checkout again!  "
      />
      <div className={style.modal__warning__footer}>
        <Button type="primary" size="large" onClick={handleOk}>
          Back to cart
        </Button>
      </div>
    </Modal>
  );
};

export default ModalWarning;
