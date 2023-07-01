import React, { useState } from 'react';
import { Modal, ModalHeader } from '../../..';
import { Button, Image } from '../../../atoms';
import style from './index.module.scss';
import { PinInput } from 'react-input-pin-code';
import { message } from 'antd';
import { useCreatePinMutation } from '../../../../app/features/wallet/walletApiSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const initialPin = ['', '', '', '', '', ''];

const ActiveWallet: React.FC = () => {
  const locationURL = useLocation();
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pin, setPin] = useState(initialPin);
  const [confirm, setConfirm] = useState(initialPin);
  const [messageApi, contextHolder] = message.useMessage();
  const [createPin] = useCreatePinMutation();

  const from =
    locationURL.state?.from?.pathname + locationURL.state?.from?.search;

  const navigate = useNavigate();
  const showModal = () => {
    setIsPinModalOpen(true);
  };

  const validatePin = (str: string[]) => {
    return str.join('').length === 6;
  };

  const handleCreatePin = () => {
    if (!validatePin(pin)) {
      messageApi.open({
        type: 'error',
        content: 'Pin must be 6 digits',
        duration: 5,
      });
      return;
    }

    setIsPinModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmPin = async () => {
    try {
      if (!validatePin(confirm)) {
        messageApi.open({
          type: 'error',
          content: 'Pin must be 6 digits',
          duration: 5,
        });
        return;
      }
      if (pin.join('') !== confirm.join('')) {
        messageApi.open({
          type: 'error',
          content: 'Pin must be same',
          duration: 5,
        });
        return;
      }
      const body = {
        pin: confirm.join(''),
      };
      await createPin(body).unwrap();
      if (from) {
        return navigate(from);
      }
      setIsConfirmModalOpen(false);
      messageApi.open({
        type: 'success',
        content: 'Pin created successfully',
        duration: 5,
      });
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
        duration: 5,
      });
    }
  };

  const handleCancel = () => {
    setIsPinModalOpen(false);
    setIsConfirmModalOpen(false);
    setPin(initialPin);
    setConfirm(initialPin);
  };

  return (
    <>
      {contextHolder}
      <div className={style.aw}>
        <Image
          src="/assets/svg/wallet.svg"
          alt="wallet"
          className={style.aw__image}
        />
        <h1 className={style.aw__title}>Enhance your experience with Wallet</h1>
        <p className={style.aw__desc}>
          Activate your wallet to purchase items easier.
        </p>
        <div className={style.aw__button}>
          <Button type="primary" onClick={showModal}>
            Activate Wallet
          </Button>
        </div>
      </div>
      <Modal
        open={isPinModalOpen}
        onCancel={handleCancel}
        onOk={handleCreatePin}
        width={400}
        centered
      >
        <ModalHeader
          title="Activate Wallet"
          info="Please create pin for your wallet"
        />
        <PinInput
          values={pin}
          onChange={(value, index, values) => setPin(values)}
          inputClassName={style.aw__code}
          containerClassName={style.aw__container}
          mask
          showState={false}
          placeholder=""
        />
      </Modal>
      <Modal
        open={isConfirmModalOpen}
        onCancel={handleCancel}
        onOk={handleConfirmPin}
        width={400}
        centered
      >
        <ModalHeader
          title="Activate Wallet"
          info="Please confirm pin for your wallet"
        />
        <PinInput
          values={confirm}
          onChange={(value, index, values) => setConfirm(values)}
          inputClassName={style.aw__code}
          containerClassName={style.aw__container}
          mask
          showState={false}
          placeholder=""
        />
      </Modal>
    </>
  );
};

export default ActiveWallet;
