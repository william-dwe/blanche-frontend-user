import React, { ChangeEvent, Fragment, useState } from 'react';
import {
  Card,
  FormLabel,
  Input,
  Modal,
  ModalHeader,
  SEO,
} from '../../components';
import style from './index.module.scss';
import { Button, message } from 'antd';
import { toRupiahWithoutSymbol } from '../../helpers/toRupiah';
import { ValidateStatus } from 'antd/es/form/FormItem';
import { capitalizeFirstLetter } from '../../helpers/capitalizeFirstLetter';
import { useWithdrawFundMutation } from '../../app/features/merchant/merchantApiSlice';
import { useNavigate } from 'react-router';
import { IErrorResponse } from '../../helpers/types/response.interface';

interface IInput {
  value: number | undefined;
  formattedValue: string | undefined;
}

const initialInputState: IInput = {
  value: undefined,
  formattedValue: undefined,
};

const Withdraw: React.FC = () => {
  const navigate = useNavigate();
  const [inputState, setInputState] = useState(initialInputState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdraw, { isLoading }] = useWithdrawFundMutation();
  const [status, setStatus] = useState<ValidateStatus>('');
  const [errorInput, setErrorInput] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const body = {
        amount: Number(inputState.value),
      };
      await withdraw(body).unwrap();
      setIsModalOpen(false);
      navigate('/merchant/wallet', { replace: true });
      message.success('Withdraw success');
    } catch (err) {
      setIsModalOpen(false);
      message.error(capitalizeFirstLetter((err as IErrorResponse).message));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value;
    str = str.replace(/[^0-9]/g, '');
    const amount = str !== '' ? parseInt(str) : undefined;
    setInputState({
      value: amount,
      formattedValue: amount ? toRupiahWithoutSymbol(amount) : '',
    });
    if (!amount) {
      setErrorInput('Amount must be filled');
      setStatus('error');
      return;
    }
    if (amount < 10000) {
      setErrorInput('Amount must be more than 10.000');
      setStatus('error');
      return;
    }
    setErrorInput('');
    setStatus('success');
  };

  return (
    <>
      <SEO title="Withdraw" />
      <div className={style.withdraw}>
        <h3 className={style.withdraw__title}>Withdraw</h3>
        <Card className={style.withdraw__card}>
          <div className={style.withdraw__amount}>
            <h4 className={style.withdraw__card__subtitle}>Amount</h4>
            <FormLabel help={errorInput} validateStatus={status}>
              <Input
                addonBefore="Rp"
                onChange={onChangeInput}
                value={inputState.formattedValue}
              />
            </FormLabel>
          </div>
          <Button
            className={style.withdraw__button}
            type="primary"
            onClick={showModal}
            disabled={!inputState.value}
            loading={isLoading}
            block
          >
            Confirm
          </Button>
        </Card>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        width={400}
        centered
      >
        <ModalHeader
          title="Confirm Withdraw"
          info="Are you sure you want to withdraw to your wallet?"
        />
      </Modal>
    </>
  );
};

export default Withdraw;
