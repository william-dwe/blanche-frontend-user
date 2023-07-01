import { ButtonProps } from 'antd';
import React from 'react';
import { ModalHeader } from '../';
import { Button } from '../../atoms';
import Modal from '../Modal';
import style from './index.module.scss';

interface ModalConfirmPageProps {
  isModalOpen: boolean;
  handleOk?: () => void;
  handleCancel?: () => void;
  title: string;
  info?: string;
  cancelButton?: boolean;
  confirmButtonText?: string;
  closable?: boolean;
  width?: number;
  confirmButtonProps?: ButtonProps;
  children?: React.ReactNode;
}

const ModalConfirm: React.FC<ModalConfirmPageProps> = (props) => {
  const {
    isModalOpen,
    title,
    width = 450,
    closable = false,
    info,
    handleOk,
    cancelButton = false,
    confirmButtonText = 'Confirm',
    confirmButtonProps,
    handleCancel,
    children,
  } = props;
  return (
    <Modal
      open={isModalOpen}
      closable={closable}
      centered
      onCancel={handleCancel}
      className={style.modal__confirm}
      width={width}
      footer={null}
    >
      <ModalHeader
        className={style.modal__confirm__header}
        title={title}
        info={info}
      />

      {children}

      <div className={style.modal__confirm__footer}>
        {cancelButton && (
          <Button
            type="primary"
            ghost
            size="large"
            onClick={handleCancel}
            {...confirmButtonProps}
          >
            Cancel
          </Button>
        )}
        <Button
          type="primary"
          size="large"
          onClick={handleOk}
          {...confirmButtonProps}
        >
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
